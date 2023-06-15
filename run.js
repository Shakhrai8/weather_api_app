const WeatherClient = require("./weather_client");
const Weather = require("./weather");

const client = new WeatherClient();
const weather = new Weather(client);

weather.load("London").then((result) => {
  return weather.getWeatherData();
});
