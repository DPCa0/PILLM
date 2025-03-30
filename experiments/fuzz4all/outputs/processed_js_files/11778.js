 
class WeatherAPI {
  constructor() {
    this.apiKey = 'YOUR_API_KEY';
    this.apiUrl = 'https://api.weatherapi.com/v1';
  }

  async fetchWeather(city) {
    const response = await fetch(`${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }

  async getWeather(city) {
    try {
      const { location, current } = await this.fetchWeather(city);
      print(`Weather in ${location.name}, ${location.country}:`);
      print(`Temperature: ${current.temp_c}°C`);
      print(`Condition: ${current.condition.text}`);
    } catch (error) {
      console.error(error);
    }
  }
}

(async () => {
  const weather = new WeatherAPI();
  const cities = ['London', 'New York', 'Tokyo'];

   
  await Promise.all(cities.map(city => weather.getWeather(city)));

   
  function* timestampGenerator() {
    while (true) {
      yield new Date().toLocaleTimeString();
      await new Promise(resolve => setTimeout(resolve, 1000));  
    }
  }

  const timestamps = timestampGenerator();
  for (let i = 0; i < 5; i++) {  
    print(timestamps.next().value);
  }
})();
