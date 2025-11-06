import os
import pandas as pd
import numpy as np
import joblib
import matplotlib.pyplot as plt
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score, confusion_matrix,
    classification_report, roc_curve, precision_recall_curve
)
from src.models.classical import build_logistic, build_rf, build_xgb, save_model


def plot_confusion_matrix(cm, model_type, out_dir):
    plt.figure(figsize=(5, 4))
    plt.imshow(cm, interpolation='nearest', cmap=plt.cm.Blues)
    plt.title(f'{model_type.upper()} - Confusion Matrix')
    plt.colorbar()
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    tick_marks = np.arange(2)
    plt.xticks(tick_marks, ['Not Fraud', 'Fraud'])
    plt.yticks(tick_marks, ['Not Fraud', 'Fraud'])
    plt.tight_layout()
    plt.show()



def plot_roc_pr_curves(y_true, probs, model_type, out_dir):
    # ROC curve
    fpr, tpr, _ = roc_curve(y_true, probs)
    plt.figure()
    plt.plot(fpr, tpr, label=f'{model_type.upper()} ROC')
    plt.plot([0, 1], [0, 1], linestyle='--', color='gray')
    plt.title('ROC Curve')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.legend()
    plt.show()


    # Precision-Recall curve
    precision, recall, _ = precision_recall_curve(y_true, probs)
    plt.figure()
    plt.plot(recall, precision, label=f'{model_type.upper()} PR')
    plt.title('Precision-Recall Curve')
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.legend()
    plt.show()



def plot_metric_bars(metrics, model_type, out_dir):
    labels = ["Accuracy", "Precision", "Recall", "F1"]
    values = [metrics["accuracy"], metrics["precision"], metrics["recall"], metrics["f1"]]

    plt.figure(figsize=(6, 4))
    bars = plt.bar(labels, values, color=['#4caf50', '#2196f3', '#ffc107', '#f44336'])
    plt.title(f"{model_type.upper()} - Metrics Overview")
    plt.ylim(0, 1.05)
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, height - 0.05, f"{height:.3f}", ha='center', color='white', fontsize=10)
    plt.tight_layout()
    plt.show()



def evaluate(model, X, y, model_type, out_dir, set_name="Validation"):
    """Compute metrics, print them, and save graphs"""
    probs = model.predict_proba(X)[:, 1]
    preds = (probs >= 0.5).astype(int)

    acc = accuracy_score(y, preds)
    prec = precision_score(y, preds, zero_division=0)
    rec = recall_score(y, preds, zero_division=0)
    f1 = f1_score(y, preds, zero_division=0)
    roc = roc_auc_score(y, probs)
    pr = average_precision_score(y, probs)
    cm = confusion_matrix(y, preds)

    print(f"\n {set_name} Metrics for {model_type.upper()}:")
    print(f"  Accuracy:   {acc:.4f}")
    print(f"  Precision:  {prec:.4f}")
    print(f"  Recall:     {rec:.4f}")
    print(f"  F1-score:   {f1:.4f}")
    print(f"  ROC-AUC:    {roc:.4f}")
    print(f"  PR-AUC:     {pr:.4f}")
    print(f"  Confusion Matrix:\n{cm}\n")

    if set_name.lower() == "test":
        plot_confusion_matrix(cm, model_type, out_dir)
        plot_roc_pr_curves(y, probs, model_type, out_dir)
        plot_metric_bars({
            "accuracy": acc, "precision": prec, "recall": rec, "f1": f1
        }, model_type, out_dir)

    return {
        "accuracy": acc, "precision": prec, "recall": rec, "f1": f1,
        "roc_auc": roc, "pr_auc": pr, "confusion_matrix": cm.tolist()
    }


def main(model_type="xgb"):
    print(f"\n Training {model_type.upper()} model...\n")

    train = pd.read_csv("data/processed/train.csv")
    val = pd.read_csv("data/processed/val.csv")
    test = pd.read_csv("data/processed/test.csv")

    y_train, X_train = train['isFraud'], train.drop(columns=['isFraud'])
    y_val, X_val = val['isFraud'], val.drop(columns=['isFraud'])
    y_test, X_test = test['isFraud'], test.drop(columns=['isFraud'])

    if model_type == "log":
        model = build_logistic()
    elif model_type == "rf":
        model = build_rf()
    else:
        model = build_xgb()

    model.fit(X_train, y_train)
    print(" Model trained successfully!")

    # Make results folder for graphs
    out_dir = f"results/{model_type}_plots"
    os.makedirs(out_dir, exist_ok=True)

    val_metrics = evaluate(model, X_val, y_val, model_type, out_dir, "Validation")
    test_metrics = evaluate(model, X_test, y_test, model_type, out_dir, "Test")

    os.makedirs("artifacts", exist_ok=True)
    save_model(model, f"artifacts/{model_type}_model.joblib")
    joblib.dump({"val": val_metrics, "test": test_metrics},
                f"artifacts/{model_type}_metrics.joblib")

    print(f" Model and metrics saved in artifacts/{model_type}_model.joblib")
    print(f"Graphs saved in {out_dir}/")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--model_type", default="xgb", choices=["log", "rf", "xgb"])
    args = parser.parse_args()
    main(args.model_type)
