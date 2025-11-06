import pennylane as qml
from pennylane import numpy as np
import torch
import torch.nn as nn


class QuantumClassifier(nn.Module):
    """
    Simple hybrid quantum-classical classifier for supervised fraud detection.
    Uses a 3-qubit variational quantum circuit integrated with PyTorch.
    """

    def __init__(self, n_qubits=3, n_features=3):
        super(QuantumClassifier, self).__init__()
        self.n_qubits = n_qubits
        self.n_features = n_features

        # Define PennyLane device (runs on CPU simulator)
        self.dev = qml.device("default.qubit", wires=self.n_qubits)

        # Define the quantum circuit
        @qml.qnode(self.dev, interface="torch")
        def circuit(inputs, weights):
            # Encode features as rotations
            for i in range(self.n_features):
                qml.RY(inputs[i], wires=i % self.n_qubits)

            # Variational layer
            qml.templates.StronglyEntanglingLayers(weights, wires=range(self.n_qubits))

            # Measurement: expectation value of PauliZ on first qubit
            return qml.expval(qml.PauliZ(0))

        self.circuit = circuit

        # Initialize circuit weights (1 layer of entanglement)
        weight_shapes = {"weights": (1, self.n_qubits, 3)}
        self.weights = nn.Parameter(torch.randn(weight_shapes["weights"], requires_grad=True))

        # Small classical layer for output
        self.fc = nn.Linear(1, 1)

    def forward(self, x):
        # x shape: (batch_size, n_features)
        batch_size = x.shape[0]
        outputs = []
        for i in range(batch_size):
            qc_output = self.circuit(x[i], self.weights)
            outputs.append(qc_output)

        qc_out = torch.stack(outputs).unsqueeze(1)  # shape (batch_size, 1)

        # Ensure same dtype (float32) for Linear layer
        qc_out = qc_out.to(dtype=torch.float32)

        return torch.sigmoid(self.fc(qc_out))

