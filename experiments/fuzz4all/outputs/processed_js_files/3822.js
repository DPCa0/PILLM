 

class WeatherAPI {
  constructor() {
    this.apiKey = 'your_api_key_here';
    this.baseUrl = 'https://api.weatherapi.com/v1/current.json';
  }

  async fetchWeather(city) {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}&q=${city}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }
}

const getFormattedWeather = ({ location: { name, region, country }, current: { temp_c, condition: { text } } }) => {
  return `Weather in ${name}, ${region}, ${country}: ${text} with a temperature of ${temp_c}°C`;
};

const displayWeather = async (...cities) => {
  const weatherAPI = new WeatherAPI();
  const weatherPromises = cities.map(city => weatherAPI.fetchWeather(city));
  
  try {
    const weatherData = await Promise.all(weatherPromises);
    weatherData.forEach(data => {
      if (data) print(getFormattedWeather(data));
    });
  } catch (error) {
    console.error('Error displaying weather:', error);
  }
};

displayWeather('New York', 'London', 'Tokyo');
