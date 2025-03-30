 

class WeatherAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.openweathermap.org/data/2.5/weather';
  }

  async fetchWeather(city) {
    const response = await fetch(`${this.baseURL}?q=${city}&appid=${this.apiKey}`);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return response.json();
  }
}

const cities = ['New York', 'London', 'Tokyo'];
const apiKey = 'YOUR_API_KEY_HERE';

(async function displayWeather() {
  const weatherAPI = new WeatherAPI(apiKey);

  const weatherPromises = cities.map(city => weatherAPI.fetchWeather(city));

  try {
    const weatherData = await Promise.all(weatherPromises);

     
    weatherData.forEach(({ name, main: { temp, humidity } }) => {
      print(`Weather in ${name}:`);
      print(`Temperature: ${temp}K, Humidity: ${humidity}%\n`);
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
})();

 
