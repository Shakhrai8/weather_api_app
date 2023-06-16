const Weather = require("./weather");
const WeatherUI = require("./weather_ui");

describe("Weather", () => {
  let weather;

  beforeEach(() => {
    jest.useFakeTimers();
    const mockWeatherClass = {
      fetchWeatherData: jest.fn().mockResolvedValue({
        name: "London",
        weather: "Sunny",
        temperature: 25,
        feels_like: 28,
        humidity: 60,
      }),
    };
    weather = new Weather(mockWeatherClass);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  describe("load method", () => {
    it("should set current_data correctly", async () => {
      const city = "London";
      await weather.load(city);
      expect(weather.current_data).toEqual({
        city_name: "London",
        weather: "Sunny",
        temperature: 25,
        feels_like: 28,
        humidity: 60,
      });
    });
  });

  describe("getWeatherData method", () => {
    it("should log weather data to the console", () => {
      weather.current_data = {
        city_name: "London",
        weather: "Sunny",
        temperature: 25,
        feels_like: 28,
        humidity: 60,
      };

      const consoleLogSpy = jest.spyOn(console, "log");
      weather.getWeatherData();

      expect(consoleLogSpy).toHaveBeenCalledWith("City: London");
      expect(consoleLogSpy).toHaveBeenCalledWith("Weather: Sunny");
      expect(consoleLogSpy).toHaveBeenCalledWith("Temperature: 25");
      expect(consoleLogSpy).toHaveBeenCalledWith("Feels like: 28");
      expect(consoleLogSpy).toHaveBeenCalledWith("Humidity: 60");
      consoleLogSpy.mockRestore();
    });
  });

  describe("compareWith method", () => {
    it("should compare temperatures and log the result", async () => {
      const mockWeatherClass = {
        fetchWeatherData: jest.fn().mockResolvedValue({
          name: "Paris",
          temperature: 30,
        }),
      };

      weather = new Weather(mockWeatherClass);
      weather.current_data = {
        city_name: "London",
        temperature: 25,
      };

      const consoleLogSpy = jest.spyOn(console, "log");

      await weather.compareWith("Paris");

      expect(consoleLogSpy).toHaveBeenCalledWith("Paris is warmer than London");
      consoleLogSpy.mockRestore();
    });
  });

  describe("WeatherUI", () => {
    it("should display the weather information in the correct format", () => {
      const weatherMock = {
        current_data: {
          city_name: "London",
          weather: "Clouds",
          temperature: 18.4,
          feels_like: 16.0,
          humidity: "64",
        },
      };

      const consoleLogSpy = jest.spyOn(console, "log");

      const weatherUI = new WeatherUI(weatherMock);
      weatherUI.displayWeather();

      expect(consoleLogSpy).toHaveBeenCalledWith(`
      City:         London
      Weather:      Clouds
      Temperature:  18.4
      Feels like:   16.0
      Humidity:     64%
      `);

      consoleLogSpy.mockRestore();
    });
  });
});
