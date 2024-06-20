import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
  },
  chartContainer: {
    width: '600px',
    height: '400px',
    marginBottom: '50px',
  },
  input: {
    margin: '10px',
    padding: '10px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    cursor: 'pointer',
  },
});

function App() {
  const classes = useStyles();
  const [ticker, setTicker] = useState('');
  const [interval, setInterval] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [historicData, setHistoricData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post('/predict', { ticker, interval });
      setPredictions(response.data.predictions);
      // Simulate fetching historic data
      setHistoricData(response.data.predictions.map((prediction, index) => index * 2));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount for demo purposes
  }, []);

  const dataHistoric = {
    labels: historicData.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: 'Historic Data',
        data: historicData,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const dataPredictions = {
    labels: predictions.map((_, index) => `Model ${index + 1}`),
    datasets: [
      {
        label: 'Predictions',
        data: predictions,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={classes.container}>
      <h1>Stock Prediction App</h1>
      <input
        className={classes.input}
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter Stock Ticker"
      />
      <input
        className={classes.input}
        type="text"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        placeholder="Enter Interval"
      />
      <button className={classes.button} onClick={fetchData}>Predict</button>
      <div className={classes.chartContainer}>
        <Line data={dataHistoric} />
      </div>
      <div className={classes.chartContainer}>
        <Bar data={dataPredictions} />
      </div>
    </div>
  );
}

export default App;
