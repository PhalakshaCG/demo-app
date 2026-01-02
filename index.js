const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = 3000;

// Replace with your actual API key from OpenWeatherMap
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'http://api.weatherapi.com/v1';
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Bengaluru '; // Default city is Bengaluru

  try {
    const response = await axios.get(WEATHER_API_URL+'/current.json', {
      params: {
        q: city,
        key: WEATHER_API_KEY,
      }
    });

    const weatherData = response.data;
    res.send(`
      <h1>Weather in ${weatherData.location.name}</h1>
      <p>Temperature: ${weatherData.current.temp_c}°C</p>
          <p>Weather Condition: <img src="${weatherData.current.condition.icon}" alt="Weather Icon" style="height: 5mm;"> ${weatherData.current.condition.text}</p>
      <p>Precipitation: ${weatherData.current.precip_mm} mm</p>
      <p>Condition: <img src="${weatherData.current.condition.icon}" alt="Weather Icon" style="height: 5mm;"> ${weatherData.current.condition.text}</p>
    `);
  } catch (error) {
    res.status(500).send('Error fetching weather data. Please try again later.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
