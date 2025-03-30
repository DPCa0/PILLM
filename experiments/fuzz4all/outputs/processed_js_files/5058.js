 

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.weatherapi.com/v1/current.json';
  }
  
  async getWeather(location) {
    const response = await fetch(`${this.baseUrl}?key=${this.apiKey}&q=${location}`);
    const data = await response.json();
    return data;
  }
}

class WeatherDisplay {
  constructor(service) {
    this.service = service;
  }
  
  async showWeather(location) {
    try {
      const { location: loc, current } = await this.service.getWeather(location);
      print(`Weather in ${loc.name}, ${loc.country}: ${current.temp_c}°C, ${current.condition.text}`);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
}

 
(async () => {
  const apiKey = 'your_api_key_here';
  const weatherService = new WeatherService(apiKey);
  const weatherDisplay = new WeatherDisplay(weatherService);

  await Promise.all([
    weatherDisplay.showWeather('London'),
    weatherDisplay.showWeather('New York'),
    weatherDisplay.showWeather('Tokyo')
  ]);
})();
