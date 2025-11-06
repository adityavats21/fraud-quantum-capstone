import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
import xgboost as xgb


def build_logistic():
    """Return a Logistic Regression model."""
    return LogisticRegression(class_weight='balanced', max_iter=1000)


def build_rf():
    """Return a Random Forest model."""
    return RandomForestClassifier(
        n_estimators=200,
        class_weight='balanced',
        n_jobs=-1,
        random_state=42
    )


def build_xgb():
    """Return an XGBoost model."""
    return xgb.XGBClassifier(
        n_estimators=200,
        eval_metric='logloss',
        use_label_encoder=False,
        random_state=42
    )


def save_model(model, path):
    joblib.dump(model, path)


def load_model(path):
    return joblib.load(path)