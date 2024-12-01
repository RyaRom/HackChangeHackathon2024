from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import joblib
import pandas as pd
from enum import Enum


# pipeline_xgb = joblib.load('xgb_pipeline.pkl')


app = FastAPI()


class ModelRequestDTO(BaseModel):
    segment: str
    organizations: int
    currentMethod: str
    mobileApp: bool
    commonMobile: int
    commonWeb: int
    specialMobile: int
    specialWeb: int
    role: str
    availableMethods: List[str]
    claims: int

class ModelResponseDTO(BaseModel):
    isError: bool
    paymentMethod: Optional[str]


@app.post("/predict", response_model=ModelResponseDTO)
def predict(data: ModelRequestDTO):
    try:
        print(data.dict)
        input_data = pd.DataFrame([data.dict()])


        # predictions = pipeline_xgb.predict(input_data)
        # probabilities = pipeline_xgb.predict_proba(input_data)


        # predicted_method = data.availableMethods[0] if data.availableMethods else None
        predicted_method = "TOKEN"
        return ModelResponseDTO(
            isError=False,
            paymentMethod=predicted_method
        )
    except Exception as e:
        print(e)
        return ModelResponseDTO(
            isError=True,
            paymentMethod=None
        )
