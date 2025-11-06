import argparse
import json
import os
import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def load_raw(path):
    return pd.read_csv(path)

def feature_engineer(df):
    df = df.copy()
    df['amount_log'] = np.log1p(df['amount'])
    df['orig_balance_change'] = df['oldbalanceOrg'] - df['newbalanceOrig']
    df['dest_balance_change'] = df['oldbalanceDest'] - df['newbalanceDest']

    # Encode type (one-hot)
    if 'type' in df.columns:
        dummies = pd.get_dummies(df['type'], prefix='type')
        df = pd.concat([df.drop(columns=['type']), dummies], axis=1)

    # Drop name columns
    df = df.drop(columns=['nameOrig', 'nameDest'], errors='ignore')
    return df

def split_and_save(df, out_dir, test_size=0.2, val_size=0.1, random_state=42):
    os.makedirs(out_dir, exist_ok=True)
    y = df['isFraud']
    X = df.drop(columns=['isFraud'])

    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=test_size + val_size, stratify=y, random_state=random_state
    )
    val_rel = val_size / (test_size + val_size)
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=1 - val_rel, stratify=y_temp, random_state=random_state
    )

    scaler = StandardScaler()
    num_cols = X_train.select_dtypes(include=[np.number]).columns
    scaler.fit(X_train[num_cols])

    for name, Xp, yp in [('train', X_train, y_train), ('val', X_val, y_val), ('test', X_test, y_test)]:
        Xt = Xp.copy()
        Xt[num_cols] = scaler.transform(Xt[num_cols])
        out_df = pd.concat([Xt, yp], axis=1)
        out_df.to_csv(f"{out_dir}/{name}.csv", index=False)

    joblib.dump(scaler, f"{out_dir}/scaler.pkl")
    with open(f"{out_dir}/feature_cols.json", "w") as f:
        json.dump({'numeric_cols': list(num_cols), 'all_columns': list(X_train.columns)}, f)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", required=True)
    parser.add_argument("--out_dir", default="data/processed")
    args = parser.parse_args()

    df = load_raw(args.input)
    df = feature_engineer(df)
    split_and_save(df, args.out_dir)
