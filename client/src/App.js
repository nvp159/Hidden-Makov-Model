import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [ticker, setTicker] = useState('');
  const [interval, setInterval] = useState('');
  const [predictions, setPredictions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post('/predict', { ticker, interval });
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Stock Prediction App</h1>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter Stock Ticker"
      />
      <input
        type="text"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        placeholder="Enter Interval"
      />
      <button onClick={fetchData}>Predict</button>
      <div>
        <h2>Predictions</h2>
        {predictions.length > 0 ? (
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index}>{prediction}</li>
            ))}
          </ul>
        ) : (
          <p>No predictions to show</p>
        )}
      </div>
    </div>
  );
}

export default App;
