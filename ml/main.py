from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd

pipeline_xgb = joblib.load('xgb_pipeline.pkl')

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "XGBoost Classification Service is Running"}


@app.post("/predict/")
def predict(data: dict):
    try:
        input_data = pd.DataFrame([data])

        predictions = pipeline_xgb.predict(input_data)
        probabilities = pipeline_xgb.predict_proba(input_data)

        return {
            "predictions": predictions.tolist(),
            "probabilities": probabilities.tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))