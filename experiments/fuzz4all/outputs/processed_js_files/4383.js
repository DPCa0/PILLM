 
class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.weatherapi.com/v1/current.json';
  }

  fetchWeather(city) {
    return fetch(`${this.apiUrl}?key=${this.apiKey}&q=${city}`)
      .then(response => response.json());
  }
}

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

async function displayWeather() {
  const apiKey = 'YOUR_API_KEY';  
  const weatherService = new WeatherService(apiKey);

  const weatherPromises = cities.map(city => weatherService.fetchWeather(city));

  try {
    const weatherDataArray = await Promise.all(weatherPromises);

    weatherDataArray.forEach(({ location: { name }, current: { temp_c, condition: { text } } }) => {
      print(`In ${name}, it is currently ${temp_c}°C with ${text}.`);
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

displayWeather();

This program uses several advanced JavaScript features: it defines a class `WeatherService` for fetching weather data, utilizes `fetch` and Promises for handling asynchronous operations, and employs `async/await` for easier readability. It also incorporates array methods like `map` and ES6 destructuring to handle data elegantly. Replace `'YOUR_API_KEY'` with a valid API key to test the program.