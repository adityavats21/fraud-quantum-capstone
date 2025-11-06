import torch
import torch.nn as nn
import torch.nn.functional as F


class FraudAutoencoder(nn.Module):
    """
    Simple Autoencoder for Unsupervised Fraud Detection.
    Learns to reconstruct normal transactions.
    """
    def __init__(self, input_dim):
        super(FraudAutoencoder, self).__init__()
        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU()
        )
        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, 128),
            nn.ReLU(),
            nn.Linear(128, input_dim)
        )

    def forward(self, x):
        encoded = self.encoder(x)
        decoded = self.decoder(encoded)
        return decoded
