 

class WeatherService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchWeather(city) {
    const response = await fetch(`${this.apiUrl}?q=${city}&appid=YOUR_API_KEY`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  }
}

class Display {
  static showWeather({ name, main: { temp }, weather: [{ description }] }) {
    print(`Weather in ${name}: ${temp}°C, ${description}`);
  }

  static showError(error) {
    console.error('Error:', error);
  }
}

(async () => {
  const weatherService = new WeatherService('https://api.openweathermap.org/data/2.5/weather');
  try {
    const city = 'London';
    const weatherData = await weatherService.fetchWeather(city);
    Display.showWeather(weatherData);
  } catch (error) {
    Display.showError(error);
  }
})();
