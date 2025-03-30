 

class WeatherStation {
  constructor(location) {
    this.location = location;
  }

  async fetchWeatherData() {
    const response = await fetch(`https: 
    return response.json();
  }
}

class WeatherReporter {
  constructor(weatherStation) {
    this.weatherStation = weatherStation;
  }

  async displayReport() {
    try {
      const data = await this.weatherStation.fetchWeatherData();
      const { location: { name }, current: { temp_c, condition: { text } } } = data;
      
      print(`Weather Report for ${name}`);
      print(`Temperature: ${temp_c}°C`);
      print(`Condition: ${text}`);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  }
}

 
const weatherStation = new WeatherStation('London');
const weatherReporter = new WeatherReporter(weatherStation);

weatherReporter.displayReport();
