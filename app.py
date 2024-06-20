from flask import Flask, request, jsonify
from hmm_model import preprocess_data, train_model, predict, fetch_data

app = Flask(__name__)

@app.route('/fetch', methods=['POST'])
def fetch_data_route():
    data = request.get_json()
    ticker = data['ticker']
    interval = data['interval']
    stock_data = fetch_data(ticker, interval)
    if stock_data.empty:
        return jsonify({'error': 'No data found for the given ticker and interval'}), 404
    return jsonify(stock_data.to_dict())

@app.route('/predict', methods=['POST'])
def make_prediction():
    data = request.get_json()
    ticker = data['ticker']
    interval = data['interval']
    stock_data = fetch_data(ticker, interval)
    if stock_data.empty:
        return jsonify({'error': 'No data found for the given ticker and interval'}), 404
    preprocessed_data = preprocess_data(stock_data)
    model = train_model(preprocessed_data)
    predictions = predict(model, preprocessed_data)
    return jsonify({'predictions': predictions.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
