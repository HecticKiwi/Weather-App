import './style.scss';

async function queryCity(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4dfd4f1a34ba6836e663bb180c8bb4fa`);
  const data = await response.json();
  return data;
}

function readData(data) {
  const countryCode = data.sys.country;
  const countryName = new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode);
  document.querySelector('.location-header').innerText = `${data.name}, ${countryName}`;

  const { icon } = data.weather[0];
  document.querySelector('.weather-img').src = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  document.querySelector('.temp').innerText = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.high').innerText = `H: ${Math.round(data.main.temp_max)}°C`;
  document.querySelector('.low').innerText = `L: ${Math.round(data.main.temp_min)}°C`;

  document.querySelector('#feels-like').innerText = `${Math.round(data.main.feels_like)}°C`;
  document.querySelector('#humidity').innerText = `${data.main.humidity}%`;
  document.querySelector('#wind-speed').innerText = `${data.wind.speed} m/s`;
}

function showError() {
  const city = document.querySelector('#city');
  city.classList.add('error');
  city.placeholder = 'City not found. Enter another.';
}

function hideError() {
  const city = document.querySelector('#city');
  city.classList.remove('error');
  city.placeholder = 'Enter a city';
}

async function submit(city) {
  try {
    await queryCity(city).then(readData);
    hideError();
  } catch {
    showError();
  }
}

document.querySelector('#search-submit').addEventListener('click', () => {
  const city = document.querySelector('#city').value;
  document.querySelector('#city').value = '';
  submit(city);
});

submit('tokyo');
