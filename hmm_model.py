import numpy as np
import pandas as pd
from hmmlearn import hmm
from sklearn.preprocessing import StandardScaler
import yfinance as yf
from sklearn.model_selection import ParameterGrid

def fetch_data(ticker, interval):
    """
    Fetches stock data using yfinance based on ticker and interval parameters.
    """
    stock_data = yf.download(ticker, interval=interval)
    return stock_data

def preprocess_data(stock_data):
    """
    Cleans and prepares stock data for training. Now accepts raw stock data directly.
    """
    # Drop any NaN values
    stock_data.dropna(inplace=True)
    
    # Feature engineering: calculate daily returns
    stock_data['Returns'] = stock_data['Close'].pct_change()
    
    # Drop rows with NaN values created by pct_change
    stock_data.dropna(inplace=True)
    
    # Standardize the features
    scaler = StandardScaler()
    stock_data['Returns'] = scaler.fit_transform(stock_data['Returns'].values.reshape(-1, 1))
    
    return stock_data

def train_model(preprocessed_data, n_components=4, covariance_type="diag"):
    """
    Trains the Hidden Markov Model using preprocessed data.
    """
    # Extract the 'Returns' as training data
    X = preprocessed_data['Returns'].values.reshape(-1, 1)
    
    # Define the HMM parameters
    model = hmm.GaussianHMM(n_components=n_components, covariance_type=covariance_type, n_iter=1000)
    
    # Fit the model
    model.fit(X)
    
    return model

def predict(model, preprocessed_data):
    """
    Makes predictions using the trained model and preprocessed data.
    """
    # Predict hidden states for the data
    hidden_states = model.predict(preprocessed_data['Returns'].values.reshape(-1, 1))
    
    # Calculate the mean of the returns for each state
    means = np.array(model.means_)
    predicted_returns = means[hidden_states]
    
    # Convert predicted returns to prices (this is a simplification)
    predictions = np.exp(predicted_returns.cumsum())
    
    return predictions

def generate_all_predictions(stock_data):
    """
    Generates predictions for multiple HMM configurations.
    """
    preprocessed_data = preprocess_data(stock_data)
    param_grid = {
        'n_components': [2, 4, 6, 8],
        'covariance_type': ['spherical', 'diag', 'full', 'tied']
    }
    results = []
    for params in ParameterGrid(param_grid):
        model = train_model(preprocessed_data, **params)
        predictions = predict(model, preprocessed_data)
        results.append({
            'params': params,
            'predictions': predictions.tolist()
        })
    return results
