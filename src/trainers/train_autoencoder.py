import os
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
import matplotlib.pyplot as plt
import seaborn as sns
from src.models.autoencoder import FraudAutoencoder


def prepare_unsupervised_data():
    """
    Loads processed train/test datasets, drops labels,
    and converts every column to numeric float32 tensors.
    """
    import pandas as pd
    import numpy as np
    import torch

    def clean_df(df):
        # Drop id-like columns if any
        drop_cols = [c for c in df.columns if "name" in c.lower()]
        df = df.drop(columns=drop_cols, errors="ignore")

        # Force all columns to numeric; coerce invalid entries to NaN
        for col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

        # Replace NaNs with 0
        df = df.fillna(0)
        return df

    train = clean_df(pd.read_csv("data/processed/train.csv"))
    test  = clean_df(pd.read_csv("data/processed/test.csv"))

    # Remove the label column if it still exists
    train = train.drop(columns=["isFraud"], errors="ignore")
    test  = test.drop(columns=["isFraud"], errors="ignore")

    # Convert to float32 numpy arrays
    X_train = np.asarray(train.values, dtype=np.float32)
    X_test  = np.asarray(test.values, dtype=np.float32)

    # Convert to tensors
    X_train = torch.tensor(X_train, dtype=torch.float32)
    X_test  = torch.tensor(X_test, dtype=torch.float32)

    return X_train, X_test


def train_autoencoder():
    X_train, X_test = prepare_unsupervised_data()
    input_dim = X_train.shape[1]

    model = FraudAutoencoder(input_dim)
    criterion = nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    train_loader = DataLoader(TensorDataset(X_train), batch_size=512, shuffle=True)

    epochs = 25
    losses = []

    model.train()
    print("🚀 Training Autoencoder (unsupervised)...")
    for epoch in range(epochs):
        epoch_loss = 0
        for (xb,) in train_loader:
            optimizer.zero_grad()
            reconstructed = model(xb)
            loss = criterion(reconstructed, xb)
            loss.backward()
            optimizer.step()
            epoch_loss += loss.item()
        avg_loss = epoch_loss / len(train_loader)
        losses.append(avg_loss)
        print(f"Epoch {epoch+1}/{epochs} | Reconstruction Loss: {avg_loss:.6f}")

    # Plot training loss
    plt.figure(figsize=(6, 4))
    plt.plot(losses, label="Training Loss")
    plt.xlabel("Epoch")
    plt.ylabel("MSE Loss")
    plt.title("Autoencoder Training Loss Curve")
    plt.legend()
    plt.show()

    # Evaluation
    model.eval()
    with torch.no_grad():
        reconstructed = model(X_test)
        reconstruction_error = torch.mean((X_test - reconstructed) ** 2, dim=1).numpy()

    # Visualize reconstruction error distribution
    plt.figure(figsize=(6, 4))
    sns.histplot(reconstruction_error, bins=50, kde=True)
    plt.title("Reconstruction Error Distribution (Test Data)")
    plt.xlabel("Reconstruction Error")
    plt.show()

    # Save model
    os.makedirs("artifacts", exist_ok=True)
    torch.save(model.state_dict(), "artifacts/autoencoder.pth")
    np.save("artifacts/reconstruction_errors.npy", reconstruction_error)

    # Simple anomaly threshold (mean + 3*std)
    threshold = np.mean(reconstruction_error) + 3 * np.std(reconstruction_error)
    print(f"\n Suggested Anomaly Threshold: {threshold:.6f}")

    print("Autoencoder model saved → artifacts/autoencoder.pth")
    print(" Reconstruction errors saved → artifacts/reconstruction_errors.npy")

    # Visualize anomalies (optional)
    anomalies = reconstruction_error > threshold
    print(f"Detected anomalies in test set: {np.sum(anomalies)} / {len(reconstruction_error)}")

    plt.figure(figsize=(6, 4))
    plt.scatter(range(len(reconstruction_error)), reconstruction_error,
                c=["red" if x else "blue" for x in anomalies], s=5)
    plt.axhline(threshold, color="orange", linestyle="--", label="Threshold")
    plt.title("Anomaly Detection via Reconstruction Error")
    plt.xlabel("Sample Index")
    plt.ylabel("Reconstruction Error")
    plt.legend()
    plt.show()

    # --- Evaluate pseudo-accuracy using true labels (optional supervised check)
    test_full = pd.read_csv("data/processed/test.csv")
    if "isFraud" in test_full.columns:
        y_true = test_full["isFraud"].values
        y_pred = (reconstruction_error > threshold).astype(int)

        from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

        acc = accuracy_score(y_true, y_pred)
        prec = precision_score(y_true, y_pred, zero_division=0)
        rec = recall_score(y_true, y_pred, zero_division=0)
        f1 = f1_score(y_true, y_pred, zero_division=0)
        roc = roc_auc_score(y_true, reconstruction_error)

        print("\n Unsupervised Autoencoder Evaluation (using true labels):")
        print(f"Accuracy:  {acc:.4f}")
        print(f"Precision: {prec:.4f}")
        print(f"Recall:    {rec:.4f}")
        print(f"F1-score:  {f1:.4f}")
        print(f"ROC-AUC:   {roc:.4f}")


if __name__ == "__main__":
    train_autoencoder()
