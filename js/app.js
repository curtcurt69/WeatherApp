const city = document.getElementById('location');
const search = document.getElementById('search');
const weather = document.getElementById('weather');
const API_KEY = 'c27bdd09f3757c3f645968d13aada3ee';

search.addEventListener('click', function () {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const currentWeather = data.weather[0].description;
            const currentTemp = Math.round(data.main.temp - 273.15);

            weather.innerHTML = `
               
                <p>Current weather: ${currentWeather}</p>
                <p>Current temperature: ${currentTemp}°C</p>
            `;
        })
        .catch(error => {
            weather.innerHTML = `<p>Error: ${error}</p>`;
        });
});

const forecast = document.getElementById('forecast');


search.addEventListener('click', function () {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {

            forecast.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const date = new Date(data.list[i].dt * 1000).toLocaleString();
                const temp = Math.round(data.list[i].main.temp - 273.15);
                const condition = data.list[i].weather[0].description;
                forecast.innerHTML += `
                    <p>${date}: ${temp}°C, ${condition}</p>
                `;
            }
        })
        .catch(error => {
            weather.innerHTML = `<p>Error: ${error}</p>`;
        });
});


