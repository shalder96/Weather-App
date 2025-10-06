const apiKey = "e5350d04ac52e12457672900c915df7c";
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', getWeather);


async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();

  if(!city) {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error("City not found!");
      
    }
    const data = await response.json();
    displayWeather(data);
  } catch(error) {
    document.getElementById("display").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
function displayWeather(data) {
  const {name, main, weather, wind } = data;
  document.getElementById('display').innerHTML = `
  <h3> ${name}</h3>
  <p>🌡️ Temperature: ${main.temp}°C</p>
  <p>💧 Humidity: ${main.humidity}%</p>
  <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
  <p>${weather[0].description}</p>
  <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather Icon">
  
  `;
}