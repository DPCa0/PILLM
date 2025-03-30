 

class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.example.com/weather';
  }

  async getWeather(city) {
    try {
      const response = await fetch(`${this.baseUrl}?city=${city}&key=${this.apiKey}`);
      if (!response.ok) throw new Error(`Error fetching weather: ${response.statusText}`);
      const data = await response.json();
      return this.formatWeatherData(data);
    } catch (error) {
      console.error(error);
      return `Failed to retrieve weather data: ${error.message}`;
    }
  }

  formatWeatherData({ location, temperature, condition }) {
    return `Weather in ${location}:
    Temperature: ${temperature}°C
    Condition: ${condition}`;
  }
}

const apiKey = 'your_api_key_here';
const weatherAPI = new WeatherAPI(apiKey);
const cities = ['New York', 'Los Angeles', 'Chicago'];

const fetchWeatherForCities = async (cities) => {
  const weatherPromises = cities.map(city => weatherAPI.getWeather(city));
  const weatherReports = await Promise.all(weatherPromises);
  weatherReports.forEach(report => print(report));
};

fetchWeatherForCities(cities);
