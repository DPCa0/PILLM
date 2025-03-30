 

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  
  async fetchJson(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  }
}

class WeatherService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async getWeatherData(city) {
    const data = await this.apiClient.fetchJson(`/weather?q=${city}&units=metric&appid=YOUR_API_KEY`);
    const { main: { temp }, weather: [{ description }] } = data;
    return { temp, description };
  }
}

(async () => {
  try {
    const client = new ApiClient('https://api.openweathermap.org/data/2.5');
    const weatherService = new WeatherService(client);

    const city = 'London';
    const { temp, description } = await weatherService.getWeatherData(city);
    print(`The current temperature in ${city} is ${temp}°C with ${description}.`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();

Note: Replace `'YOUR_API_KEY'` with your actual OpenWeather API key.