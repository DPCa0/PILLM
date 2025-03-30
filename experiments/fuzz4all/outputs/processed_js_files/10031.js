Certainly! Below is a JavaScript program that demonstrates the use of advanced features like async/await, ES6 classes, and template literals:

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  }
}

class WeatherApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiURL = `https: 
  }

  async getWeather(city) {
    const dataFetcher = new DataFetcher(`${this.apiURL}${city}`);
    const weatherData = await dataFetcher.fetchData();
    this.displayWeather(city, weatherData);
  }

  displayWeather(city, data) {
    if (!data) {
      console.error("No data available");
      return;
    }
    const { temp_c, condition: { text } } = data.current;
    print(`The current temperature in ${city} is ${temp_c}°C with ${text}.`);
  }
}

(async () => {
  const myWeatherApp = new WeatherApp('your_api_key_here');
  await myWeatherApp.getWeather('New York');
})();

Replace `'your_api_key_here'` with a valid API key from a weather data provider like WeatherAPI. The program fetches and displays the current weather for a given city using advanced JavaScript features.