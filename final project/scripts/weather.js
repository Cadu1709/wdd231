const apiKey = '12f341f073de512a02800a32c662071f';
const entebbeLat = 0.05;
const entebbeLon = 32.46;

const entebbeCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${entebbeLat}&lon=${entebbeLon}&units=metric&appid=${apiKey}`;
const entebbeForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${entebbeLat}&lon=${entebbeLon}&units=metric&appid=${apiKey}`;

async function fetchWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector('#weather'); // this is the container in my html with id weather-icon
    weatherContainer.innerHTML = ''; // Clear previous content

    const section = document.createElement('section');
    section.classList.add('current-weather');

    const weatherIcon = document.createElement('img');
    const currentTemp = document.createElement('p');
    const weatherDesc = document.createElement('p');
    const captionDesc = document.createElement('figcaption');

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    currentTemp.innerHTML = `Current Temperature: ${data.main.temp}&deg;C`;
    weatherDesc.innerHTML = `The Weather Today is:  ${desc}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('loading', 'lazy');
    weatherIcon.setAttribute('width','60');
    weatherIcon.setAttribute('height','70');
    //captionDesc.textContent = `${desc}`;

    section.appendChild(currentTemp);
    section.appendChild(weatherDesc);
    section.appendChild(weatherIcon);
    section.appendChild(captionDesc);

    weatherContainer.appendChild(section);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData(entebbeCurrentWeatherUrl)
        .then(displayCurrentWeather)
        .catch(error => console.error('Error fetching Entebbe current weather data:', error));
});