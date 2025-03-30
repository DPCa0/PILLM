 

class WeatherFetcher {
  #apiKey;
  
  constructor(apiKey) {
    this.#apiKey = apiKey;
  }

  async fetchWeather(city) {
    try {
      const response = await fetch(`https: 
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      const { temp_c, condition: { text: condition } } = data.current;
      return { city, temp_c, condition };
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

(async () => {
  const apiKey = 'YOUR_API_KEY_HERE';  
  const weatherFetcher = new WeatherFetcher(apiKey);
  
  const cities = ['New York', 'London', 'Tokyo'];
  
  const weatherPromises = cities.map(city => weatherFetcher.fetchWeather(city));
  const results = await Promise.all(weatherPromises);

  results.forEach(({ city, temp_c, condition }) => {
    print(`${city}: ${temp_c}°C, ${condition}`);
  });
})();

Replace `'YOUR_API_KEY_HERE'` with a valid API key from a weather API service like WeatherAPI.com. This program uses various advanced JavaScript features to fetch weather data for multiple cities concurrently.