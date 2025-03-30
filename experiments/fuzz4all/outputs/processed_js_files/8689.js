 

class WeatherApp {
  constructor(city) {
    this.city = city;
    this.apiKey = 'your_api_key_here';  
  }

  async getWeather() {
    try {
      const response = await fetch(`https: 
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.extractWeatherDetails(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  extractWeatherDetails(data) {
    const { main: { temp }, weather: [{ description }], wind: { speed } } = data;
    return {
      temperature: (temp - 273.15).toFixed(2),  
      description,
      windSpeed: speed
    };
  }

  displayWeather() {
    this.getWeather().then(({ temperature, description, windSpeed }) => {
      console.log(`The current weather in ${this.city} is:
        Temperature: ${temperature} °C
        Description: ${description}
        Wind Speed: ${windSpeed} m/s`);
    }).catch(error => {
      console.error('Error displaying weather:', error);
    });
  }
}

const myWeatherApp = new WeatherApp('New York');
myWeatherApp.displayWeather();
