from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import pandas as pd
from enum import Enum


loaded_model = joblib.load('catboost_pipeline_model.joblib')


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
        "context":"special",
        "pred":""
    }

    return result

@app.post("/predict", response_model=ModelResponseDTO)
def predict(data: ModelRequestDTO):
    try:
        print(data.dict)
        transformed_dict = transform_to_dict(data)
        input_data = pd.DataFrame([transformed_dict])


        predictions = loaded_model.predict(input_data)
        probabilities = loaded_model.predict_proba(input_data)


        predicted_method = METHOD_MAPPING[predictions[0]]
        return ModelResponseDTO(
            isError=False,
            paymentMethod=predicted_method
        )
    except Exception as e:
        return ModelResponseDTO(
            isError=True,
            paymentMethod=None
        )

dto = ModelRequestDTO(
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

transformed_dict = transform_to_dict(dto)
print(transformed_dict)