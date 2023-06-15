const apiKey = require('./apiKey');

class WeatherClient {

  fetchWeatherData = (city) => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weather = data.weather.map((result) => result.main);
        return {
          name: data.name,
          weather: weather[0],
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity
        };
      });
  };
};

module.exports = WeatherClient;