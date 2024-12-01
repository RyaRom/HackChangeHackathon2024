FROM python:3.10-slim

WORKDIR /app
COPY ./main_folder /app

RUN pip install --no-cache-dir fastapi uvicorn pandas joblib pydantic

EXPOSE 8000

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]