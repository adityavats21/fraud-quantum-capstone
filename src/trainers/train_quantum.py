import os
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import pandas as pd
import numpy as np
from src.models.quantum_model import QuantumClassifier


def prepare_data(sample_size=500):
    """
    Load a small sample from the dataset for Quantum model training.
    Cleans all non-numeric columns and converts to float32 tensors.
    """

    import pandas as pd
    import numpy as np
    import torch

    def clean_df(df):
        # Drop any id-like or string columns
        drop_cols = [c for c in df.columns if "name" in c.lower()]
        df = df.drop(columns=drop_cols, errors="ignore")

        # Force all columns to numeric
        for col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

        # Replace NaNs with 0
        df = df.fillna(0)
        return df

    df_train = clean_df(pd.read_csv("data/processed/train.csv"))
    df_test  = clean_df(pd.read_csv("data/processed/test.csv"))

    # Keep only numeric columns
    df_train = df_train.select_dtypes(include=[np.number])
    df_test  = df_test.select_dtypes(include=[np.number])

    # Separate features and labels
    y_train, X_train = df_train["isFraud"].values, df_train.drop(columns=["isFraud"]).values
    y_test,  X_test  = df_test["isFraud"].values,  df_test.drop(columns=["isFraud"]).values

    # Reduce to first 3 numeric features (for 3 qubits)
    X_train = X_train[:, :3]
    X_test  = X_test[:, :3]

    # Convert to float32 tensors
    X_train = torch.tensor(np.asarray(X_train, dtype=np.float32))
    y_train = torch.tensor(y_train, dtype=torch.float32).unsqueeze(1)
    X_test  = torch.tensor(np.asarray(X_test, dtype=np.float32))
    y_test  = torch.tensor(y_test, dtype=torch.float32).unsqueeze(1)

    return X_train, y_train, X_test, y_test



def train_quantum():
    X_train, y_train, X_test, y_test = prepare_data()

    model = QuantumClassifier(n_qubits=3, n_features=3)
    criterion = nn.BCELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

    train_loader = DataLoader(TensorDataset(X_train, y_train), batch_size=16, shuffle=True)
    epochs = 10

    print(" Training Quantum Hybrid Model...")
    for epoch in range(epochs):
        model.train()
        epoch_loss = 0.0
        for xb, yb in train_loader:
            optimizer.zero_grad()
            preds = model(xb)
            loss = criterion(preds, yb)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()
        print(f"Epoch {epoch+1}/{epochs} | Loss: {epoch_loss / len(train_loader):.5f}")

    # Evaluate
    model.eval()
    with torch.no_grad():
        y_pred_probs = model(X_test).numpy().flatten()
    y_pred = (y_pred_probs >= 0.5).astype(int)
    y_true = y_test.numpy().flatten()

    acc = accuracy_score(y_true, y_pred)
    prec = precision_score(y_true, y_pred, zero_division=0)
    rec = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    roc = roc_auc_score(y_true, y_pred_probs)

    print("\n Quantum Hybrid Model Results:")
    print(f"Accuracy:   {acc:.4f}")
    print(f"Precision:  {prec:.4f}")
    print(f"Recall:     {rec:.4f}")
    print(f"F1-score:   {f1:.4f}")
    print(f"ROC-AUC:    {roc:.4f}")

    os.makedirs("artifacts", exist_ok=True)
    torch.save(model.state_dict(), "artifacts/quantum_model.pth")
    print(" Saved Quantum model → artifacts/quantum_model.pth")


if __name__ == "__main__":
    train_quantum()
