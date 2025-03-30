 
class WeatherStation {
  constructor() {
    this.apiKey = 'YOUR_API_KEY';  
    this.endpoint = 'https://api.weatherapi.com/v1/current.json';
  }

  async getWeather(city) {
    try {
      const response = await fetch(`${this.endpoint}?key=${this.apiKey}&q=${city}`);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      const { location: { name }, current: { temp_c, condition: { text } } } = data;
      return `Current weather in ${name}: ${temp_c}°C, ${text}.`;
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}

(async () => {
  const station = new WeatherStation();
  try {
    const weatherReport = await station.getWeather('New York');
    print(weatherReport);
  } catch (error) {
    console.error('Could not get weather:', error);
  }
})();
