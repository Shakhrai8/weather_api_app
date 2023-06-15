const readline = require("readline");
const Weather = require("./weather");
const WeatherUI = require("./weather_ui");
const WeatherClient = require("./weather_client");

const client = new WeatherClient();
const weather = new Weather(client);
const weatherUI = new WeatherUI(weather);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function handleUserInput(city) {
  weather
    .load(city)
    .then(() => {
      weatherUI.displayWeather();
      rl.close();
    })
    .catch((error) => {
      console.log("Error:", error.message);
      rl.close();
    });
}

rl.question("Enter a city name: ", handleUserInput);
