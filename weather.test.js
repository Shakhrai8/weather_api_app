const Weather = require("./weather");

describe("Weather", () => {
  describe("load method", () => {
    test("should set current_data correctly", () => {
      const mockWeatherClass = {
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
    test("should log weather data to the console", () => {
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

      consoleLogSpy.mockRestore();
    });
  });

  describe("compareWith method", () => {
    test("should compare temperatures and log the result", () => {
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
});
