#  Fraud Detection using Quantum Computing

> **An advanced AI-Quantum hybrid system for real-time financial fraud detection.**  
> Built by **Aditya Vats (B.Tech CSE, VIT)** as a Capstone Project 2025.

---

##  Overview

This project integrates **Machine Learning**, **Deep Learning**, **Unsupervised Learning**, and **Quantum Computing** to predict and prevent fraudulent transactions.

It simulates how modern financial systems can combine **classical intelligence and quantum power** for faster, smarter, and adaptive fraud detection.

The complete application includes:
-  **Model Training Pipeline** (ML, DL, Autoencoder, Quantum)
-  **FastAPI Backend** for prediction
-  **React Frontend (Vercel Deployed)** for visualization
-  **Full-stack Deployment** (Render + Vercel + MongoDB)

---

##  Problem Statement

Traditional rule-based or static ML systems fail to detect **evolving and unseen fraud patterns**, especially in **imbalanced datasets** where fraud cases are <1%.

This project addresses that by designing a **multi-layered adaptive system** that:
1. Learns both known and unseen patterns.
2. Detects anomalies using reconstruction and quantum inference.
3. Provides real-time predictions with interpretability.

---

##  Model Architecture

### 1. Classical Machine Learning
Models: Logistic Regression, Random Forest, XGBoost  
> Baseline models trained on engineered tabular features.  
> XGBoost achieved **99.2% accuracy** and **94% F1-score**.

###  2. Deep Learning (MLP)
> Captures non-linear patterns in transactional relationships.  
Architecture: 128 → 64 → 32 → 1 (ReLU + BCE Loss).  
Achieved **0.996 ROC-AUC**.

###  3. Autoencoder (Unsupervised)
> Learns normal transaction reconstruction; deviations are anomalies.  
Ideal for **zero-day frauds** and unseen cases.  
AUC: **0.993**, F1: **0.901**.

###  4. Quantum SVM (Qiskit + Pennylane)
> Uses quantum kernel mapping to separate fraud and normal regions in Hilbert space.  
Achieved **93.7% accuracy** — proof of concept for quantum potential in finance.

---

##  System Architecture
        ┌─────────────────────────────┐
        │   Raw Transaction Dataset   │
        └────────────┬────────────────┘
                     │
            Data Cleaning & Feature Engineering
                     │
       ┌─────────────┼────────────────┐
       │              │                │
 Classical ML      Deep Learning   Unsupervised (AE)
       │              │                │
       └─────────────┼────────────────┘
                     │
            Hybrid Model Fusion
                     │
               Quantum Layer
                     │
              Fraud Prediction API
                     │
         React Frontend Visualization

---

##  Results Summary

| Model | Accuracy | F1 | ROC-AUC | Notes |
|-------|-----------|----|----------|-------|
| Logistic Regression | 98.1% | 89% | 0.981 | Linear Baseline |
| Random Forest | 98.6% | 91% | 0.987 | Ensemble Learning |
| **XGBoost** | **99.2%** | **94%** | **0.992** | Production Model |
| MLP (Deep Learning) | 98.8% | 93.5% | 0.996 | Non-linear Features |
| Autoencoder | 97.9% | 90.1% | 0.993 | Unsupervised Anomaly Detection |
| Quantum SVM | 93.7% | 87.5% | 0.971 | Quantum Hybrid |

---

##  Tech Stack

###  Machine Learning
- Scikit-learn  
- XGBoost  
- PyTorch  
- Qiskit / Pennylane  

###  Backend
- FastAPI  
- Uvicorn  
- Joblib  
- Pandas / NumPy  

###  Frontend
- React.js (Vite)  
- TailwindCSS  
- Framer Motion  
- Recharts  

###  Deployment
- **Backend:** Render  
- **Frontend:** Vercel  
- **Dataset:** Local CSV (6M+ transactions)

---

##  Project Structure
fraud-quantum-capstone/
│
├── app.py # FastAPI backend
├── requirements.txt # Dependencies
│
├── src/
│ ├── models/ # Model definitions
│ ├── trainers/ # Training scripts
│ ├── utils/ # Preprocessing helpers
│
├── data/
│ ├── raw/ # Original dataset
│ ├── processed/ # Cleaned CSVs
│
├── client/ # Frontend (React + Tailwind)
│ ├── src/components/ # UI Components
│ ├── pages/ # Compare, Dashboard, Predict, About
│
└── artifacts/ # Saved Models, Metrics, Outputs


---

##  How to Run Locally

###  1. Clone the Repository
```bash
git clone https://github.com/adityavats21/fraud-quantum-capstone.git
cd fraud-quantum-capstone
```
### 2. Setup Environment
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```
### 3. Run Backend
```bash
uvicorn app:app --reload
```
### 4. Run Frontend
```bash
cd client
npm install
npm run dev
```
🌍 Live Deployment

Frontend (Vercel): https://fraud-quantum-capstone.vercel.app/

###Author
Aditya Vats
B.Tech CSE, VIT University
adityavats21@gmail.com
GitHub: adityavats21
