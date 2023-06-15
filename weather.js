class Weather {
  constructor(weather_class) {
    this.weather_class = weather_class;
    this.current_data = {};
  }

  load(city) {
    return this.weather_class.fetchWeatherData(city).then((result) => {
      this.current_data = {
        city_name: result.name,
        weather: result.weather,
        temperature: result.temperature,
        feels_like: result.feels_like,
        humidity: result.humidity,
      };
    });
  }

  getWeatherData() {
    console.log(`City: ${this.current_data.city_name}`);
    console.log(`Weather: ${this.current_data.weather}`);
    console.log(`Temperature: ${this.current_data.temperature}`);
    console.log(`Feels like: ${this.current_data.feels_like}`);
    console.log(`Humidity: ${this.current_data.humidity}`);
  }

  compareWith(city) {}
}

module.exports = Weather;
