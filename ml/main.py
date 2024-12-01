from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import pandas as pd
from enum import Enum


# pipeline_xgb = joblib.load('xgb_pipeline.pkl')


app = FastAPI()



class PaymentMethod(str, Enum):
    SMS = "SMS"
    PAY_CONTROL = "PAY_CONTROL"
    TOKEN = "TOKEN"
    APP = "APP"


class SegmentType(str, Enum):
    SMALL = "SMALL"
    MIDDLE = "MIDDLE"
    LARGE = "LARGE"


class UserRole(str, Enum):
    USER = "USER"
    STAFF = "STAFF"



class ModelRequestDTO(BaseModel):
    segment: SegmentType
    organizations: int
    currentMethod: PaymentMethod
    mobileApp: bool
    commonMobile: int
    commonWeb: int
    specialMobile: int
    specialWeb: int
    role: UserRole
    availableMethods: List[PaymentMethod]
    claims: int



class ModelResponseDTO(BaseModel):
    isError: bool
    paymentMethod: Optional[PaymentMethod]


@app.get("/")
def read_root():
    return {"message": "XGBoost Classification Service is Running"}


@app.post("/predict", response_model=ModelResponseDTO)
def predict(data: ModelRequestDTO):
    try:
        print(data.dict)
        input_data = pd.DataFrame([data.dict()])


        # predictions = pipeline_xgb.predict(input_data)
        # probabilities = pipeline_xgb.predict_proba(input_data)


        # predicted_method = data.availableMethods[0] if data.availableMethods else None
        predicted_method = PaymentMethod.PAY_CONTROL
        return ModelResponseDTO(
            isError=False,
            paymentMethod=predicted_method
        )
    except Exception as e:
        return ModelResponseDTO(
            isError=True,
            paymentMethod=None
        )
