from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd
import os
import traceback

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../artifacts/xgb_model.joblib")
SCALER_PATH = os.path.join(BASE_DIR, "../data/processed/scaler.pkl")

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
except Exception as e:
    print(f" Error loading model/scaler: {e}")
    model, scaler = None, None

# Expected feature order
FEATURE_ORDER = [
    "step", "amount", "oldbalanceOrg", "newbalanceOrig",
    "oldbalanceDest", "newbalanceDest", "isFlaggedFraud",
    "amount_log", "orig_balance_change", "dest_balance_change",
    "type_CASH_IN", "type_CASH_OUT", "type_DEBIT",
    "type_PAYMENT", "type_TRANSFER"
]

NUMERIC_COLS = getattr(scaler, "feature_names_in_", [])

app = FastAPI(title="Fraud Detection API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Transaction(BaseModel):
    type: str
    amount: float
    account_age: int


def preprocess_input(tx: Transaction):
    BASE_ORG_BAL = 5000
    BASE_DEST_BAL = 1000

    df = pd.DataFrame([{
        "step": 1,
        "amount": tx.amount,
        "oldbalanceOrg": BASE_ORG_BAL,
        "newbalanceOrig": max(0, BASE_ORG_BAL - tx.amount),
        "oldbalanceDest": BASE_DEST_BAL,
        "newbalanceDest": BASE_DEST_BAL + tx.amount,
        "isFlaggedFraud": 0,
    }])

    # Feature Engineering
    df["amount_log"] = np.log1p(df["amount"])
    df["orig_balance_change"] = df["newbalanceOrig"] - df["oldbalanceOrg"]
    df["dest_balance_change"] = df["newbalanceDest"] - df["oldbalanceDest"]

    # One-hot Encoding
    tx_type = tx.type.upper()
    for t in ["CASH_IN", "CASH_OUT", "DEBIT", "PAYMENT", "TRANSFER"]:
        df[f"type_{t}"] = 1 if tx_type == t else 0

    # Scale Numeric
    scaled_numeric = pd.DataFrame(
        scaler.transform(df[NUMERIC_COLS]),
        columns=NUMERIC_COLS
    )

    # Merge Scaled + Categorical
    final_df = pd.concat([
        scaled_numeric,
        df[[c for c in df.columns if c not in NUMERIC_COLS]]
    ], axis=1)

    # Reorder Columns
    final_df = final_df.reindex(columns=FEATURE_ORDER, fill_value=0)

    return final_df.values


@app.get("/")
def home():
    return {
        "status": "running",
        "message": "🚀 Fraud Detection API powered by XGBoost (ML layer)"
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(tx: Transaction):
    if model is None or scaler is None:
        return {"error": "Model or scaler not loaded on server. Please redeploy."}

    try:
        X = preprocess_input(tx)
        proba = float(model.predict_proba(X)[0][1])
        label = int(proba > 0.5)

        return {
            "probability": round(proba * 100, 2),
            "label": label,
            "message": (
                "⚠️ Fraudulent transaction detected!"
                if label == 1
                else "Safe transaction detected."
            ),
        }

    except Exception as e:
        print(traceback.format_exc())
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=10000, reload=True)