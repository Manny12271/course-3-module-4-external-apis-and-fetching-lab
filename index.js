const API_KEY = '610cd175537f651e8262f131564d2e1e'

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('City not found')
    }
    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

function displayWeather(data) {
  const weatherDisplay = document.getElementById('weather-display')
  const tempCelsius = Math.round(data.main.temp - 273.15)

  weatherDisplay.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${tempCelsius}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Description: ${data.weather[0].description}</p>
  `
}

function displayError(message) {
  const errorElement = document.getElementById('error-message')
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.remove('hidden')
  }
}

function clearError() {
  const errorElement = document.getElementById('error-message')
  if (errorElement) {
    errorElement.textContent = ''
    errorElement.classList.add('hidden')
  }
}

function clearWeather() {
  const weatherDisplay = document.getElementById('weather-display')
  if (weatherDisplay) {
    weatherDisplay.innerHTML = ''
  }
}

function setupEventListeners() {
  const button = document.getElementById('fetch-weather')
  if (!button) return

  button.addEventListener('click', async () => {
    const cityInput = document.getElementById('city-input')
    const city = cityInput ? cityInput.value.trim() : ''

    clearError()
    clearWeather()

    if (!city) {
      displayError('Please enter a city name.')
      return
    }

    try {
      const data = await fetchWeatherData(city)
      displayWeather(data)
    } catch (error) {
      displayError(error.message)
    }
  })
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', setupEventListeners)
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchWeatherData,
    displayWeather,
    displayError,
    clearError,
    clearWeather,
    setupEventListeners,
  }
}
