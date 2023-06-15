const Weather = require("./weather");
const WeatherUI = require("./weather_ui");

describe("Weather", () => {
  describe("load method", () => {
    it("should set current_data correctly", () => {
      const mockWeatherClass = {
        // creating double for mocking with built in methods from jest
        fetchWeatherData: jest.fn().mockResolvedValue({
          name: "London",
          weather: "Sunny",
          temperature: 25,
          feels_like: 28,
          humidity: 60,
        }),
      };

      const weather = new Weather(mockWeatherClass);
      const city = "London";

      return weather.load(city).then(() => {
        expect(weather.current_data).toEqual({
          city_name: "London",
          weather: "Sunny",
          temperature: 25,
          feels_like: 28,
          humidity: 60,
        });
      });
    });
  });

  describe("getWeatherData method", () => {
    it("should log weather data to the console", () => {
      const weather = new Weather();

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
      // The original console.log function is replaced by the spy. After we have
      // finished using the spy and performed any necessary assertions or test logic,
      // we call consoleLogSpy.mockRestore() to restore the original console.log function.
      consoleLogSpy.mockRestore();
    });
  });

  describe("compareWith method", () => {
    it("should compare temperatures and log the result", () => {
      const mockWeatherClass = {
        fetchWeatherData: jest.fn().mockResolvedValue({
          name: "Paris",
          temperature: 30,
        }),
      };

      const weather = new Weather(mockWeatherClass);
      weather.current_data = {
        city_name: "London",
        temperature: 25,
      };

      const consoleLogSpy = jest.spyOn(console, "log");

      return weather.compareWith("Paris").then(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          "Paris is warmer than London"
        );
        consoleLogSpy.mockRestore();
      });
    });
  });

  describe("WeatherUI", () => {
    test("should display the weather information in the correct format", () => {
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

      // Create WeatherUI instance with the weather mock
      const weatherUI = new WeatherUI(weatherMock);

      // Invoke the method
      weatherUI.displayWeather();

      expect(consoleLogSpy).toHaveBeenCalledWith(`
      City:         London
      Weather:      Clouds
      Temperature:  18.4
      Feels like:   16.0
      Humidity:     64%
      `);

      // Restore the original console.log implementation
      consoleLogSpy.mockRestore();
    });
  });

  jest.useFakeTimers();

  describe("Weather timer", () => {
    let weather;
    let weatherClassMock;

    beforeEach(() => {
      // Mock the weather class
      weatherClassMock = {
        fetchWeatherData: jest.fn().mockResolvedValue({
          name: "London",
          weather: "Clouds",
          temperature: 18.4,
          feels_like: 16.0,
          humidity: "64%",
        }),
      };

      // Create a new Weather instance
      weather = new Weather(weatherClassMock);
    });

    afterEach(() => {
      // Stop the refresh interval after each test
      weather.stopRefresh();
    });

    test("should periodically refresh weather data every 5 seconds", () => {
      // Test case for the timer functionality
    });
  });
});
