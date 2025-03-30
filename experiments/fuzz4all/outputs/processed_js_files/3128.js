 

class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.example.com/weather';
  }

  async fetchWeatherData(city) {
    try {
      const response = await fetch(`${this.baseURL}?q=${city}&appid=${this.apiKey}`);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      return this.extractWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  }

  extractWeatherData(data) {
    const { main: { temp, humidity }, weather: [details] } = data;
    return { temp, humidity, description: details.description };
  }
}

(async () => {
  const apiKey = 'your_api_key_here';
  const cities = ['New York', 'London', 'Tokyo'];
  const weatherService = new WeatherService(apiKey);

  const weatherPromises = cities.map(city => weatherService.fetchWeatherData(city));
  const weatherData = await Promise.all(weatherPromises);

  print(weatherData.map(({ temp, ...rest }) => ({ temp: temp.toFixed(1), ...rest })));
})();
