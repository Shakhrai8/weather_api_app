class WeatherUI {
  constructor(weather_class) {
    this.weather_class = weather_class;
  }

  displayWeather() {
    const formattedOutput = `
      City:         ${this.weather_class.current_data.city_name}
      Weather:      ${this.weather_class.current_data.weather}
      Temperature:  ${this.weather_class.current_data.temperature.toFixed(1)}
      Feels like:   ${this.weather_class.current_data.feels_like.toFixed(1)}
      Humidity:     ${this.weather_class.current_data.humidity}%
      `;

    console.log(formattedOutput);
  }
}

module.exports = WeatherUI;
