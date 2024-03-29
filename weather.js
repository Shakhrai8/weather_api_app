class Weather {
  constructor(weather_class) {
    this.weather_class = weather_class;
    this.current_data = {};

    // Set up periodic data refresh
    this.refreshInterval = setInterval(this.refreshData.bind(this), 5000); // Refresh every 5 seconds
  }

  refreshData() {
    if (this.current_data.city_name && this.refreshInterval) {
      console.log("Refreshing weather data\n");

      this.weather_class
        .fetchWeatherData(this.current_data.city_name)
        .then((result) => {
          this.current_data = {
            city_name: result.name,
            weather: result.weather,
            temperature: result.temperature,
            feels_like: result.feels_like,
            humidity: result.humidity,
          };
          this.getWeatherData();
          console.log("-----------------------");
        })
        .catch((error) => {
          console.log("Error refreshing weather data:", error.message);
        });
    } else {
      console.log("City name is not available for refresh");
    }
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

  compareWith(city) {
    return this.weather_class.fetchWeatherData(city).then((new_city_data) => {
      if (this.current_data.temperature > new_city_data.temperature) {
        console.log(
          `${this.current_data.city_name} is warmer than ${new_city_data.name}`
        );
        return `${this.current_data.city_name} is warmer than ${new_city_data.name}`;
      } else {
        console.log(
          `${new_city_data.name} is warmer than ${this.current_data.city_name}`
        );
        return `${new_city_data.name} is warmer than ${this.current_data.city_name}`;
      }
    });
  }

  stopRefresh() {
    // Stop the periodic data refresh
    clearInterval(this.refreshInterval);
  }
}

module.exports = Weather;
