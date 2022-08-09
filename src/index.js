import './style.scss';

async function queryCity(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4dfd4f1a34ba6836e663bb180c8bb4fa`);
  const json = await response.json();
  console.log(json);
  return json;
}

function readJSON(JSON) {
  const city = JSON.name;
  const countryCode = JSON.sys.country;
  const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
  document.querySelector('.location-header').innerText = `${city}, ${countryName}`;

  const { icon } = JSON.weather[0];
  document.querySelector('.weather-img').src = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  document.querySelector('.temp').innerText = `${Math.round(JSON.main.temp)}°C`;
  document.querySelector('.high').innerText = `H: ${Math.round(JSON.main.temp_max)}°C`;
  document.querySelector('.low').innerText = `L: ${Math.round(JSON.main.temp_min)}°C`;

  document.querySelector('#feels-like').innerText = `${Math.round(JSON.main.feels_like)}°C`;
  document.querySelector('#humidity').innerText = `${JSON.main.humidity}%`;
  document.querySelector('#wind-speed').innerText = `${JSON.wind.speed} m/s`;
}

queryCity('Calgary').then(readJSON);
