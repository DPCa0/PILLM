 

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.weatherapi.com/v1/current.json';
  }

  async fetchWeather(city) {
    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}&q=${city}`);
      const data = await response.json();
      return this.processWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  processWeatherData(data) {
    const { location: { name }, current: { temp_c, condition: { text } } } = data;
    return `Current temperature in ${name} is ${temp_c}°C with ${text}.`;
  }
}

class UI {
  static displayWeatherInfo(weatherInfo) {
    print(weatherInfo);
  }
}

const apiKey = 'your_api_key_here';  
const service = new WeatherService(apiKey);

(async () => {
  const cities = ['New York', 'London', 'Tokyo'];
  const weatherPromises = cities.map(city => service.fetchWeather(city));

  Promise.all(weatherPromises)
    .then(results => results.forEach(UI.displayWeatherInfo))
    .catch(error => console.error('Error processing weather data:', error));
})();
