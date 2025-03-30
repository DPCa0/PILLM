 

class WeatherService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchWeather(city) {
    try {
      const response = await fetch(`${this.apiUrl}?q=${city}&units=metric&appid=YOUR_API_KEY`);
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(`Error fetching weather data: ${error.message}`);
    }
  }
}

const displayWeather = async (city) => {
  const weatherService = new WeatherService('https://api.openweathermap.org/data/2.5/weather');
  const { main: { temp }, weather: [{ description }] } = await weatherService.fetchWeather(city);

  print(`The current weather in ${city} is ${description} with a temperature of ${temp}°C.`);
};

const cities = ['New York', 'London', 'Tokyo'];

Promise.all(cities.map(city => displayWeather(city)))
  .then(() => console.log('Weather data displayed successfully.'))
  .catch(error => console.error(`An error occurred: ${error}`));

