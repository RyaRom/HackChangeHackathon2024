FROM python:3.10-slim

WORKDIR /app
COPY . /app
COPY catboost_pipeline_model.joblib encoders.pkl /app/


RUN pip install fastapi uvicorn pandas joblib pydantic catboost scikit-learn==1.4.2 numpy

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]