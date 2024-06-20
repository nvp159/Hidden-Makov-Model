## Stock Prediction Web Application Using Hidden Markov Model (HMM)

This project now features a Python React web application that automates the entire process of generating stock price predictions with a single click. Users can input a stock ticker and interval, and the application will automatically fetch data from yfinance, preprocess, clean, train, test, and generate predictions.

### Introduction

Financial forecasting is a critical task in investment and trading. Traders, investors, and financial analysts constantly seek effective tools and models to predict stock prices. This web application simplifies the process by automating data fetching, preprocessing, cleaning, training, testing, and predicting, making it accessible to users with varying levels of expertise.

### The Hidden Markov Model (HMM)

Hidden Markov Models are a class of statistical models used to describe a system where the states are not directly observable but can be inferred from the observed data. In the context of stock price forecasting, HMMs can be employed to model the hidden states of the market, which can include various market conditions (e.g., bull, bear, or sideways markets).

### Web Application Highlights

Our project highlights include:

1. **Automated Predictions:** Users can generate all possible predictions with a single click, including data fetching, preprocessing, cleaning, training, testing, and predicting for given interval and stock ticker inputs.

2. **Python React Web Application:** A new web application developed using Python and React, allowing for a user-friendly interface and seamless interaction.

3. **Empirical Evidence:** We provide empirical evidence to demonstrate the effectiveness of the HMM in stock price forecasting, supported by the automated process.

4. **Theoretical Foundations:** We explore the theoretical foundations of Markov models, with a specific focus on Hidden Markov Models, to gain a deeper understanding of their application in financial forecasting.

### Getting Started with the Web Application

To set up and run the web application, follow these steps:

1. **Install Dependencies:**

   Ensure you have the necessary Python libraries and Node.js installed. Run the following commands in your terminal:

   ```bash
   pip install -r requirements.txt
   cd client
   npm install
   ```

2. **Start the Backend Server:**

   Navigate back to the project root directory and run the Flask backend server:

   ```bash
   python app.py
   ```

3. **Launch the Web Application:**

   Open a new terminal window, navigate to the `client` directory, and start the React application:

   ```bash
   npm start
   ```

   The web application will be accessible at `http://localhost:3000`.

### Using the Application

To generate stock price predictions:

1. Enter the stock ticker and interval in the provided input fields.
2. Click the "Predict" button.
3. The application will fetch the data, process it, and display the predictions on the screen.

### Troubleshooting

If you encounter any issues while setting up or using the web application, please ensure that all dependencies are correctly installed and that the Flask backend server is running. For further assistance, feel free to contact the author of this repository.

**Author:** Nikhil Kumar Patel
