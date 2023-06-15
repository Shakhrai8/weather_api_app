const WeatherClient = require("./weather_client");
const Weather = require("./weather");
const WeatherUI = require("./weather_ui");

const client = new WeatherClient();
const weather = new Weather(client);
const ui = new WeatherUI(weather);

weather.load("London").then((result) => {
  return ui.displayWeather();
});
