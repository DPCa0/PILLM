 

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async getWeatherData(city) {
    const response = await fetch(`${this.baseUrl}?q=${city}&appid=${this.apiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  }
}

class WeatherFormatter {
  static format({ name: city, weather: [{ description }], main: { temp } }) {
    const temperatureCelsius = (temp - 273.15).toFixed(2);
    return `The current weather in ${city} is ${description} with a temperature of ${temperatureCelsius} °C.`;
  }
}

(async () => {
  try {
    const weatherService = new WeatherService('YOUR_API_KEY');
    const rawWeatherData = await weatherService.getWeatherData('London');
    print(WeatherFormatter.format(rawWeatherData));
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

Replace `'YOUR_API_KEY'` with a valid API key from OpenWeatherMap to run this code.