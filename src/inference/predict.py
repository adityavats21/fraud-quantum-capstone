import joblib
import json
import numpy as np
import pandas as pd
import os

def load_artifacts(model_path, scaler_path, feature_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    if not os.path.exists(scaler_path):
        raise FileNotFoundError(f"Scaler file not found: {scaler_path}")
    if not os.path.exists(feature_path):
        raise FileNotFoundError(f"Feature meta file not found: {feature_path}")

    model = joblib.load(model_path)
    scaler = joblib.load(scaler_path)
    with open(feature_path, "r") as f:
        features = json.load(f)
    return model, scaler, features

def _ensure_columns(df, expected_cols):
    """Ensure all expected columns exist in df; add zeros for missing ones."""
    for c in expected_cols:
        if c not in df.columns:
            df[c] = 0
    return df[expected_cols]

def preprocess_one(record, scaler, meta):
    df = pd.DataFrame([record])

    # Fill optional columns missing in request
    for col in ['isFlaggedFraud']:
        if col not in df.columns:
            df[col] = 0  # default: not flagged

    # Core feature engineering
    df['amount_log'] = np.log1p(df.get('amount', 0.0))
    df['orig_balance_change'] = df.get('oldbalanceOrg', 0.0) - df.get('newbalanceOrig', 0.0)
    df['dest_balance_change'] = df.get('oldbalanceDest', 0.0) - df.get('newbalanceDest', 0.0)

    # Handle type (one-hot)
    type_cols = [c for c in meta['all_columns'] if str(c).startswith('type_')]
    if 'type' in df.columns:
        dummies = pd.get_dummies(df['type'], prefix='type')
        for col in type_cols:
            df[col] = dummies.get(col, 0)
        df = df.drop(columns=['type'])

    # Drop non-numeric identifiers
    df = df.drop(columns=['nameOrig', 'nameDest'], errors='ignore')

    # Ensure numeric columns exist and scale
    numeric_cols = meta.get('numeric_cols', [])
    for c in numeric_cols:
        if c not in df.columns:
            df[c] = 0.0

    df[numeric_cols] = scaler.transform(df[numeric_cols])

    # Final alignment to training columns
    X = _ensure_columns(df, meta['all_columns'])
    return X

def predict_json(model_path, scaler_path, feature_path, record):
    model, scaler, meta = load_artifacts(model_path, scaler_path, feature_path)
    X = preprocess_one(record, scaler, meta)
    if hasattr(model, "predict_proba"):
        prob = model.predict_proba(X)[:, 1][0]
    else:
        prob = 1 / (1 + np.exp(-model.decision_function(X)[0]))
    label = int(prob >= 0.5)
    return {"probability": float(prob), "label": label}
