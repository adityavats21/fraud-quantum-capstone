# server_debug.py -- run this from project root to see full traceback from predict function
import traceback
from pprint import pprint

try:
    from src.inference.predict import predict_json, load_artifacts
    import json, os
    # Paths used by server
    model_path = os.path.abspath("artifacts/xgb_model.joblib")
    scaler_path = os.path.abspath("data/processed/scaler.pkl")
    feature_path = os.path.abspath("data/processed/feature_cols.json")

    print("Model path:", model_path)
    print("Scaler path:", scaler_path)
    print("Feature meta path:", feature_path)
    print()

    # quick existence checks
    for p in (model_path, scaler_path, feature_path):
        print(p, "exists?", os.path.exists(p))

    sample = {
      "step": 1,
      "type": "TRANSFER",
      "amount": 1500.0,
      "nameOrig": "C12345",
      "oldbalanceOrg": 2000.0,
      "newbalanceOrig": 500.0,
      "nameDest": "D6789",
      "oldbalanceDest": 0.0,
      "newbalanceDest": 1500.0
    }

    print("\nRunning predict_json() now...")
    res = predict_json(model_path, scaler_path, feature_path, sample)
    pprint(res)
except Exception as e:
    print("Exception caught. Full traceback below:\n")
    traceback.print_exc()