const apiKey = '12f341f073de512a02800a32c662071f';
const saoPauloLat = -23.55;
const saoPauloLon = -46.63;

const saoPauloCurrentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${saoPauloLat}&lon=${saoPauloLon}&units=metric&appid=${apiKey}`;
const saoPauloForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${saoPauloLat}&lon=${saoPauloLon}&units=metric&appid=${apiKey}`;

async function fetchWeatherData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector('#weather-icon');
    weatherContainer.innerHTML = '';

    const section = document.createElement('section');
    section.classList.add('current-weather');

    const weatherIcon = document.createElement('img');
    const currentTemp = document.createElement('p');
    const weatherDesc = document.createElement('p');
    const captionDesc = document.createElement('figcaption');

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;

    currentTemp.innerHTML = `Current Temperature: ${data.main.temp}&deg; Degrees`;
    weatherDesc.innerHTML = `The Weather Today is: ${desc}`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('loading', 'lazy');
    weatherIcon.setAttribute('width', '60');
    weatherIcon.setAttribute('height', '70');

    section.appendChild(currentTemp);
    section.appendChild(weatherDesc);
    section.appendChild(weatherIcon);
    section.appendChild(captionDesc);

    weatherContainer.appendChild(section);
}

function displaysaoPauloForecast(data) {
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = '';

    if (data.list && Array.isArray(data.list)) {
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

        dailyData.slice(0, 3).forEach(day => {
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');

            const date = moment(day.dt_txt).format('MMMM Do, YYYY');
            const temp = `${day.main.temp}&deg; Degrees`;
            const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
            const desc = day.weather[0].description;

            forecastCard.innerHTML = `
                <h3>${date}</h3>
                <img src="${icon}" alt="${desc}" loading="lazy" width="200" height="200">
                <p>${desc}</p>
                <p>Temperature: ${temp}</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });
    } else {
        console.error('Invalid forecast data structure', data);
    }
}

function displaysaoPauloTime() {
    const localTime = document.querySelector('#localTime');
    const saoPauloTime = moment().tz("America/Sao_Paulo").format('HH:mm:ss');
    localTime.textContent = `Local Time in São Paulo: ${saoPauloTime}`;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData(saoPauloCurrentWeatherUrl)
        .then(displayCurrentWeather)
        .catch(error => console.error('Error fetching São Paulo current weather data:', error));

    fetchWeatherData(saoPauloForecastUrl)
        .then(displaysaoPauloForecast)
        .catch(error => console.error('Error fetching São Paulo forecast data:', error));

    displaysaoPauloTime();
    setInterval(displaysaoPauloTime, 1000);

    document.getElementById('join').addEventListener("click", redirectJoin);

    function redirectJoin() {
        window.location.href = "join.html";
    }
});
