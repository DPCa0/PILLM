 
class WeatherService {
  static async fetchWeatherData(city) {
    const apiKey = 'YOUR_API_KEY_HERE';
    const response = await fetch(`https: 
    if (!response.ok) throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    return response.json();
  }
}

class WeatherApp {
  constructor(city) {
    this.city = city;
    this.weatherData = null;
  }

  async init() {
    try {
      this.weatherData = await WeatherService.fetchWeatherData(this.city);
      this.displayWeather();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  displayWeather() {
    const { main: { temp }, weather: [{ description }] } = this.weatherData;
    print(`The weather in ${this.city} is currently ${description} with a temperature of ${this.convertToCelsius(temp)}°C.`);
  }

  convertToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }
}

 
const cityArgs = [...process.argv.slice(2)];
if (cityArgs.length === 0) {
  console.error('Please provide at least one city name');
  process.exit(1);
}

cityArgs.forEach(city => new WeatherApp(city).init());

Note: Replace `'YOUR_API_KEY_HERE'` with a valid API key from OpenWeather.