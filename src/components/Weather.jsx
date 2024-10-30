// src/Weather.js
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("London"); 
  const [error, setError] = useState(null);

  const apiKey = "ebc4255d756b6a2f33cb17c769332546"; 
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setWeatherData(null); // Clear previous data
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <h2>Weather Information</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
