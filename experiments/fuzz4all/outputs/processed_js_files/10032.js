 
class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiURL = 'https://api.example.com/weather';
  }
  
  async fetchWeather(city) {
    try {
      const response = await fetch(`${this.apiURL}?q=${city}&appid=${this.apiKey}`);
      const data = await response.json();
      return this.processWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  processWeatherData(data) {
     
    const { weather, main: { temp } } = data;
    const weatherDescriptions = weather.map(({ description }) => description).join(', ');
    return `Current temperature in ${data.name} is ${temp}°C with ${weatherDescriptions}.`;
  }

  static logWeather(city, message) {
    print(`Weather update for ${city}: ${message}`);
  }
}

const apiKey = 'your_api_key_here';
const weatherApp = new WeatherApp(apiKey);

 
weatherApp.fetchWeather('New York').then(message => WeatherApp.logWeather('New York', message));
