 
 

class WeatherService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.cache = new Proxy({}, {
      get: (target, name) => name in target ? target[name] : undefined,
      set: (target, name, value) => {
        target[name] = value;
        return true;
      }
    });
  }

  async fetchWeather(city) {
    if (this.cache[city]) {
      print('Returning cached data...');
      return this.cache[city];
    }

    print('Fetching new data...');
    const response = await fetch(`${this.apiUrl}?q=${city}&appid=YOUR_API_KEY`);
    const data = await response.json();
    this.cache[city] = data;
    return data;
  }

  static processWeatherData(data) {
    const {
      main: { temp, humidity },
      weather: [ { description } ],
    } = data;
    return { temp, humidity, description };
  }
}

(async () => {
  const weatherService = new WeatherService('https://api.openweathermap.org/data/2.5/weather');
  try {
    const rawWeatherData = await weatherService.fetchWeather('New York');
    const processedData = WeatherService.processWeatherData(rawWeatherData);
    print(`The weather in New York is: ${processedData.description}. Temp: ${processedData.temp}K, Humidity: ${processedData.humidity}%`);
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
  }
})();

**Note:** Replace `'YOUR_API_KEY'` with a valid OpenWeatherMap API key to run the code.