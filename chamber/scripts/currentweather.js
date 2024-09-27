document.addEventListener('DOMContentLoaded', () => {


    //declare all variables in the html file that need to be displayed.
    
    const currentTemp = document.querySelector('#current-temp');
    const weatherIcon = document.querySelector('#weather-icon');
    const captionDesc = document.querySelector('figcaption');
  
    
    //decalre variable named url to use openweather data.
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=0.05107&lon=32.46386&units=metric&appid=12f341f073de512a02800a32c662071f';
    
    //http://api.openweathermap.org/geo/1.0/reverse?lat={lat}&lon={lon}&limit={limit}&appid={API key}
    
    //create async function
    async function apiFetch() {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                //console.log(data);//for testing only
                displayResults(data); 
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    function displayResults(data) {
        currentTemp.innerHTML = `Current Temperature is : ${data.main.temp}&deg;C`;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let desc = data.weather[0].description;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', desc);
        captionDesc.textContent = `${desc}`;
    }
    //set time for saoPaulo.
    function displaysaoPauloime() {
        const localTime = document.querySelector('#localTime');

        //get the current time for saoPaulo town using moment.js and Moment Timezone
        const saoPauloeTime = moment().tz("Africa/Kampala").format('HH:mm:ss');
        localTime.textContent = `Local Time in saoPaulo : ${saoPauloTime}`;
    }

    // Function to display 3-day forecast data for saoPaulo, Uganda
    function displaysaoPauloForecast(data) {
    const forecastContainer = document.querySelector('#forecast');
    forecastContainer.innerHTML = '';

    // Filter the data to get daily forecasts
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyData.slice(0, 3).forEach(day => {
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        const date = moment(day.dt_txt).format('MMMM Do, YYYY');
        const temp = `${day.main.temp}&deg;C`;
        const icon = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
        const desc = day.weather[0].description;

        forecastCard.innerHTML = `
            <h3>${date}</h3>
            <img src="${icon}" alt="${desc}">
            <p>${desc}</p>
            <p>Temperature: ${temp}</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
    }
      apiFetch();
      displaysaoPauloTime();
      displaysaoPauloForecast();

      //update the time every second
      setInterval(displaysaoPauloTime, 1000);
});