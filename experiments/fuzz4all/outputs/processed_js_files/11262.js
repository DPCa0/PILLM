class WeatherForecast {
  #apiKey = 'your_api_key_here';
  
  constructor(location) {
    this.location = location;
    this.cache = new Map();
  }

  async #fetchWeatherData() {
    if (this.cache.has(this.location)) {
      print('Fetching data from cache...');
      return this.cache.get(this.location);
    }
    
    const response = await fetch(`https: 
    const data = await response.json();
    
    this.cache.set(this.location, data);
    return data;
  }

  async getWeather() {
    try {
      const data = await this.#fetchWeatherData();
      const { temp_c, condition } = data.current;
      print(`The current temperature in ${this.location} is ${temp_c}°C and it is ${condition.text}.`);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }

  static async parallelForecasts(locations) {
    const forecasts = locations.map(location => new WeatherForecast(location).getWeather());
    await Promise.all(forecasts);
  }
}

(async () => {
  const cities = ['New York', 'Tokyo', 'Paris'];
  
  print('Fetching weather data for multiple cities in parallel...');
  await WeatherForecast.parallelForecasts(cities);
})();

Please note that this code assumes that you have a valid API key for `Weather API`. Be sure to replace `'your_api_key_here'` with an actual API key.