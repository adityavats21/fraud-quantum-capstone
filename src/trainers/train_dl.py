import os
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix, roc_curve, precision_recall_curve
)
import matplotlib.pyplot as plt
import seaborn as sns
from src.models.dl_model import FraudDetectionMLP


def prepare_data():
    """Load processed CSV files and convert to PyTorch tensors (force numeric)."""
    import pandas as pd
    import numpy as np
    import torch

    def clean_df(df):
        # Drop any text IDs
        drop_cols = [c for c in df.columns if "name" in c.lower()]
        df = df.drop(columns=drop_cols, errors="ignore")

        # Convert all remaining columns to numeric
        for col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")
        # Replace NaNs with 0
        df = df.fillna(0)
        return df

    train = clean_df(pd.read_csv("data/processed/train.csv"))
    val   = clean_df(pd.read_csv("data/processed/val.csv"))
    test  = clean_df(pd.read_csv("data/processed/test.csv"))

    y_train, X_train = train["isFraud"].values, train.drop(columns=["isFraud"]).values
    y_val,   X_val   = val["isFraud"].values,   val.drop(columns=["isFraud"]).values
    y_test,  X_test  = test["isFraud"].values,  test.drop(columns=["isFraud"]).values

    # Force numpy arrays to float32
    X_train = np.asarray(X_train, dtype=np.float32)
    X_val   = np.asarray(X_val, dtype=np.float32)
    X_test  = np.asarray(X_test, dtype=np.float32)

    # Convert to tensors
    X_train = torch.tensor(X_train, dtype=torch.float32)
    y_train = torch.tensor(y_train, dtype=torch.float32).unsqueeze(1)
    X_val   = torch.tensor(X_val, dtype=torch.float32)
    y_val   = torch.tensor(y_val, dtype=torch.float32).unsqueeze(1)
    X_test  = torch.tensor(X_test, dtype=torch.float32)
    y_test  = torch.tensor(y_test, dtype=torch.float32).unsqueeze(1)

    return X_train, y_train, X_val, y_val, X_test, y_test


def evaluate_dl(y_true, y_pred_probs, threshold=0.5):
    y_pred = (y_pred_probs >= threshold).astype(int)
    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    roc = roc_auc_score(y_true, y_pred_probs)
    pr = average_precision_score(y_true, y_pred_probs)
    cm = confusion_matrix(y_true, y_pred)
    return acc, prec, rec, f1, roc, pr, cm


def plot_metrics(y_true, y_pred_probs, model_name):
    """Generate ROC, PR, and confusion matrix graphs"""
    fpr, tpr, _ = roc_curve(y_true, y_pred_probs)
    precision, recall, _ = precision_recall_curve(y_true, y_pred_probs)

    plt.figure(figsize=(6,5))
    plt.plot(fpr, tpr, label=f"{model_name} ROC")
    plt.plot([0, 1], [0, 1], "k--")
    plt.xlabel("False Positive Rate")
    plt.ylabel("True Positive Rate")
    plt.title("ROC Curve")
    plt.legend()
    plt.show()

    plt.figure(figsize=(6,5))
    plt.plot(recall, precision, label=f"{model_name} PR")
    plt.xlabel("Recall")
    plt.ylabel("Precision")
    plt.title("Precision-Recall Curve")
    plt.legend()
    plt.show()

    y_pred = (y_pred_probs >= 0.5).astype(int)
    cm = confusion_matrix(y_true, y_pred)
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.title("Confusion Matrix")
    plt.xlabel("Predicted")
    plt.ylabel("Actual")
    plt.show()


def train_dl():
    X_train, y_train, X_val, y_val, X_test, y_test = prepare_data()
    input_dim = X_train.shape[1]

    model = FraudDetectionMLP(input_dim)
    criterion = nn.BCELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=512, shuffle=True)

    epochs = 20
    model.train()
    for epoch in range(epochs):
        epoch_loss = 0.0
        for xb, yb in train_loader:
            optimizer.zero_grad()
            preds = model(xb)
            loss = criterion(preds, yb)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()
        print(f"Epoch {epoch+1}/{epochs} | Loss: {epoch_loss/len(train_loader):.5f}")

    # Evaluation
    model.eval()
    with torch.no_grad():
        y_val_pred = model(X_val).numpy().flatten()
        y_test_pred = model(X_test).numpy().flatten()

    acc, prec, rec, f1, roc, pr, cm = evaluate_dl(y_test.numpy(), y_test_pred)
    print("\n Test Metrics (Deep Learning MLP):")
    print(f"Accuracy:   {acc:.4f}")
    print(f"Precision:  {prec:.4f}")
    print(f"Recall:     {rec:.4f}")
    print(f"F1-score:   {f1:.4f}")
    print(f"ROC-AUC:    {roc:.4f}")
    print(f"PR-AUC:     {pr:.4f}")
    print("Confusion Matrix:\n", cm)

    plot_metrics(y_test.numpy(), y_test_pred, "DL_MLP")

    os.makedirs("artifacts", exist_ok=True)
    torch.save(model.state_dict(), "artifacts/dl_model.pth")
    print("Saved DL model → artifacts/dl_model.pth")


if __name__ == "__main__":
    train_dl()