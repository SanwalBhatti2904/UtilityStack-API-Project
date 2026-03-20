# UtilityStack – API Toolbox

A modern, glass‑themed website that showcases six free and fun APIs in one place.  
Built with HTML, CSS, and vanilla JavaScript. Perfect for learning how to fetch and display data from public APIs.

## 🚀 Features

- **Current Weather** – Real‑time weather for any city (OpenWeatherMap)
- **Random Cat** – Instant adorable cat images (The Cat API)
- **Dictionary** – Word definitions, phonetics, and examples (Free Dictionary API)
- **Programming Jokes** – Random geeky jokes (JokeAPI)
- **Currency Converter** – Live exchange rates for 150+ currencies (ExchangeRate‑API)
- **Fake Posts** – Sample blog posts (JSONPlaceholder)
- **Dark/Light mode** – Theme toggle with persistent storage
- **Smart search** – Search internal features or Wikipedia
- **Fully responsive** – Works on all devices

## 🛠️ Technologies Used

- HTML5, CSS3 (with custom properties and glassmorphism)
- JavaScript (ES6, async/await, fetch API)
- Font Awesome 6 (free icons)
- Google Fonts (Inter)

## 🔑 API Keys

Some features require free API keys. After obtaining them, add them to `js/config.js`:

```javascript
window.API_KEYS = {
  openweathermap: 'YOUR_OPENWEATHERMAP_KEY',
  exchangerate: 'YOUR_EXCHANGERATE_KEY'
};