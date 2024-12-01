from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import pandas as pd
from enum import Enum

import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
import numpy as np


# Функция для предварительной обработки данных
def preprocess(df, encoders=None, save_encoders_path=None):
    # Если переданы энкодеры, используем их для трансформации
    if encoders is None:
        encoders = {}

    # Перевод id в числовой формат

    # Выделение доступных методов подписи клиента
    list_methods = ['SMS', 'PayControl', 'КЭП в приложении', 'КЭП на токене']
    for val in list_methods:
        df[f'available_{val}'] = df['availableMethods'].apply(lambda x: 1 if val in x else 0)
    df = df.drop(columns='availableMethods')

    # Кодирование столбца 'segment' через LabelEncoder
    if "segment" in df.columns:
        if "segment" not in encoders:
            encoders["segment"] = LabelEncoder()
            df["segment"] = encoders["segment"].fit_transform(df["segment"])
        else:
            df["segment"] = encoders["segment"].transform(df["segment"])

    # Преобразование категориальных признаков в числовые
    cat_columns = df.select_dtypes(include=['object']).columns.to_list()
    for col in cat_columns:
        if col not in encoders:  # Если энкодер для столбца ещё не создан
            unique_vals = df[col].nunique()
            if unique_vals >= 3:  # Если уникальных значений >= 3, используем LabelEncoder
                encoders[col] = LabelEncoder()
                df[col] = encoders[col].fit_transform(df[col])
            else:  # Если уникальных значений < 3, применяем OneHotEncoder
                encoders[col] = OneHotEncoder(sparse_output=False, drop='first')
                one_hot_encoded = encoders[col].fit_transform(df[[col]])
                one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoders[col].get_feature_names_out([col]),
                                          index=df.index)
                df = pd.concat([df, one_hot_df], axis=1)
                df = df.drop(columns=[col])  # Убираем оригинальный столбец
        else:  # Если энкодер уже создан, используем его для трансформации
            if isinstance(encoders[col], LabelEncoder):
                df[col] = encoders[col].transform(df[col])
            elif isinstance(encoders[col], OneHotEncoder):
                one_hot_encoded = encoders[col].transform(df[[col]])
                one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoders[col].get_feature_names_out([col]),
                                          index=df.index)
                df = pd.concat([df, one_hot_df], axis=1)
                df = df.drop(columns=[col])

    # Приведение булевых столбцов (например, mobileApp) к типу bool
    if "mobileApp" in df.columns:
        df["mobileApp"] = df["mobileApp"].astype('bool')

    # Удаление ненужных столбцов, если они есть
    columns_to_drop = ["role_ЕИО", "context_special"]
    df = df.drop(columns=[col for col in columns_to_drop if col in df.columns], axis=1)

    # Сохранение энкодеров в файл, если указан путь
    if save_encoders_path:
        joblib.dump(encoders, save_encoders_path)

    return df, encoders


# Функция для обработки новых данных с использованием сохранённых энкодеров
def transform_new_data(df, encoders):
    # Выделение доступных методов подписи клиента
    list_methods = ['SMS', 'PayControl', 'КЭП в приложении', 'КЭП на токене']
    for val in list_methods:
        df[f'available_{val}'] = df['availableMethods'].apply(lambda x: 1 if val in x else 0)
    df = df.drop(columns='availableMethods')

    # Кодирование столбца 'segment' через LabelEncoder
    if "segment" in df.columns:
        if "segment" not in encoders:
            encoders["segment"] = LabelEncoder()
            df["segment"] = encoders["segment"].fit_transform(df["segment"])
        else:
            df["segment"] = encoders["segment"].transform(df["segment"])

    for col, encoder in encoders.items():
        if col in df.columns:
            if isinstance(encoder, LabelEncoder):
                df[col] = df[col].apply(lambda x: x if x in encoder.classes_ else None)
                encoder.classes_ = np.append(encoder.classes_, None)
                df[col] = encoder.transform(df[col])
            elif isinstance(encoder, OneHotEncoder):
                one_hot_encoded = encoder.transform(df[[col]])
                one_hot_df = pd.DataFrame(one_hot_encoded, columns=encoder.get_feature_names_out([col]), index=df.index)
                df = pd.concat([df, one_hot_df], axis=1)
                df = df.drop(columns=[col])

    df = df.drop("organizationId", axis=1)
    df = df.drop(columns='clientId', axis=1)

    return df.drop(columns='pred')


loaded_model = joblib.load('catboost_pipeline_model.joblib')
encoders = joblib.load("encoders.pkl")
pred_classes = encoders["pred"].classes_

app = FastAPI()
METHOD_MAPPING = {
    "SMS": "SMS",
    "PayControl": "PAY_CONTROL",
    "КЭП на токене": "TOKEN",
    "КЭП в приложении": "APP"
}
REVERSE_SEGMENT_MAPPING = {
    "SMALL": "Малый бизнес",
    "MIDDLE": "Средний бизнес",
    "LARGE": "Крупный бизнес"
}

REVERSE_ROLE_MAPPING = {
    "USER": "ЕИО",
    "STAFF": "Сотрудник"
}

REVERSE_METHOD_MAPPING = {
    "SMS": "SMS",
    "PAY_CONTROL": "PayControl",
    "TOKEN": "КЭП на токене",
    "APP": "КЭП в приложении"
}


class ModelRequestDTO(BaseModel):
    segment: str
    organizations: int
    role: str
    currentMethod: str
    mobileApp: bool
    commonMobile: int
    commonWeb: int
    specialMobile: int
    specialWeb: int
    availableMethods: List[str]
    claims: int


class ModelResponseDTO(BaseModel):
    isError: bool
    paymentMethod: Optional[str]


def transform_to_dict(dto: ModelRequestDTO) -> dict:
    # Reverse map segment, role, and methods
    segment = REVERSE_SEGMENT_MAPPING.get(dto.segment, "Неизвестно")
    role = REVERSE_ROLE_MAPPING.get(dto.role, "Неизвестно")
    current_method = REVERSE_METHOD_MAPPING.get(dto.currentMethod, "Неизвестно")
    available_methods = [
        REVERSE_METHOD_MAPPING.get(method, "Неизвестно") for method in dto.availableMethods
    ]

    result = {
        "clientId": "empty",
        "organizationId": "empty",
        "segment": segment,
        "role": role,
        "organizations": dto.organizations,
        "currentMethod": current_method,
        "mobileApp": dto.mobileApp,
        "signatures.common.mobile": dto.commonMobile,
        "signatures.common.web": dto.commonWeb,
        "signatures.special.mobile": dto.specialMobile,
        "signatures.special.web": dto.specialWeb,
        "availableMethods": ", ".join(available_methods),
        "claims": dto.claims,
        "context": "special",
        "pred": ""
    }

    return result


data = ModelRequestDTO(
    clientId='client_123',
    organizationId="organization_123",
    segment="SMALL",
    organizations=25,
    currentMethod="SMS",
    mobileApp=True,
    commonMobile=5,
    commonWeb=10,
    specialMobile=3,
    specialWeb=2,
    role="USER",
    availableMethods=["SMS", "PAY_CONTROL"],
    claims=2
)


@app.post("/predict", response_model=ModelResponseDTO)
def predict(data: ModelRequestDTO):
    try:
        transformed_dict = transform_to_dict(data)
        input_data = pd.DataFrame([transformed_dict])
        input_data = transform_new_data(input_data, encoders)

        predictions = loaded_model.predict(input_data)
        predicted_method = pred_classes[predictions][0][0]

        return ModelResponseDTO(
            isError=False,
            paymentMethod=predicted_method
        )
    except Exception as e:
        print(f"Error during prediction: {e}")
        return ModelResponseDTO(
            isError=True,
            paymentMethod=None
        )


method = predict(data)
print(method)