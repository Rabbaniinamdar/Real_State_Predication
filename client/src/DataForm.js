import React, { useState } from 'react';

import './DataForm.css';

export default function DataForm() {
  const [age, setAge] = useState('');
  const [distance, setDistance] = useState('');
  const [nos, setNos] = useState('');
  const [response, setResponse] = useState('View the prediction result here');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({ age, distance, nos });

    await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(JSON.parse(data));
        setError('');

      })
      .catch((error) => {
        setError(error.message);
        setResponse('');
      });
  };
  console.log(response.toString())
  return (
    <div >
      <header>
        <h1>Real State Prediction </h1>
      </header>

      <section className="input-form-container">
        <h2>Input Data</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="age">Age of the house:</label>
            <input
              type="number"
              id="age"
              name="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="form-input">
            <label htmlFor="distance">Distance from nearest MRT satiation</label>
            <input
              type="number"
              id="distance"
              name="distance"
              required
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />
          </div>

          <div className="form-input">
            <label htmlFor="nos">Number of convenience stores</label>
            <input
              type="number"
              id="nos"
              name="nos"
              required
              value={nos}
              onChange={(e) => setNos(e.target.value)}
            />
          </div>

          <input type="submit" value="Predict" id="calculate-button" />
        </form>
      </section>

      <section className="ouput-form-container">
        <h2>Predicted Price</h2>
        <div >
          {response && <p> {response}</p>}
          {error && <p>{error}</p>}
        </div>
      </section>

      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
}
