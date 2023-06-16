const readline = require("readline");
const Weather = require("./weather");
const WeatherUI = require("./weather_ui");
const WeatherClient = require("./weather_client");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let firstInput = true; // Track the first input
let weather; // Declare the weather variable outside the function

function handleUserInput(city) {
  if (city.toLowerCase() === "stop") {
    // Convert input to lowercase for case-insensitive comparison
    weather.stopRefresh();
    console.log("Refresh stopped. Exiting...");
    rl.close();
    return;
  }

  if (firstInput) {
    // Handle the first input separately
    firstInput = false;
    const client = new WeatherClient();
    weather = new Weather(client); // Assign the weather instance to the variable
    const weatherUI = new WeatherUI(weather);
    weather
      .load(city)
      .then(() => {
        weatherUI.displayWeather();
        askForCity(); // Ask for city input again
      })
      .catch((error) => {
        console.log("Error:", error.message);
        askForCity(); // Ask for city input again
      });
  } else {
    // Handle subsequent inputs
    weather.load(city);
  }
}

function askForCity() {
  rl.question("Enter a city name (or 'stop' to exit): ", handleUserInput);
}

// Start by asking for the initial city input
askForCity();
