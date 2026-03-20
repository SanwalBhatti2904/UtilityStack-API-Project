// js/weather.js
document.addEventListener('DOMContentLoaded', () => {
  const apiKey = window.API_KEYS?.openweathermap;
  if (!apiKey) {
    alert('OpenWeatherMap API key missing. Please add it to js/config.js');
    return;
  }

  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather');
  const resultDiv = document.getElementById('weather-result');
  const spinner = resultDiv.querySelector('.loading-spinner');
  const errorDiv = resultDiv.querySelector('.error-message');
  const detailsDiv = resultDiv.querySelector('.weather-details');

  getWeatherBtn.addEventListener('click', fetchWeather);

  async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
      showError('Please enter a city name');
      return;
    }

    // Show loading
    spinner.style.display = 'block';
    errorDiv.style.display = 'none';
    detailsDiv.style.display = 'none';

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) throw new Error('City not found');
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();

      // Display weather
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      detailsDiv.innerHTML = `
        <div class="weather-main">
          <div class="weather-icon"><img src="${iconUrl}" alt="${data.weather[0].description}"></div>
          <div class="weather-temp">${Math.round(data.main.temp)}°C</div>
        </div>
        <div class="weather-desc">${data.weather[0].description}</div>
        <div class="weather-extra">
          <div>💧 Humidity: ${data.main.humidity}%</div>
          <div>💨 Wind: ${data.wind.speed} m/s</div>
          <div>🌡️ Feels like: ${Math.round(data.main.feels_like)}°C</div>
          <div>📍 ${data.name}, ${data.sys.country}</div>
        </div>
      `;
      detailsDiv.style.display = 'block';
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  }

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
    spinner.style.display = 'none';
    detailsDiv.style.display = 'none';
  }

  // Optional: fetch on Enter key
  cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather();
  });
});