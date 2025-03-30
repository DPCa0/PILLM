 

class WeatherStation {
  constructor(location) {
    this.location = location;
    this.data = [];
  }

  async fetchWeather() {
    try {
      const response = await fetch(`https: 
      const weatherData = await response.json();
      this.data.push(weatherData);
      this.displayWeather(this.data[0]);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  }

  displayWeather({ location: { name }, current: { temp_c, condition: { text } } }) {
    print(`Weather for ${name}: ${temp_c}°C, ${text}`);
  }

  *weatherDataGenerator() {
    for (const entry of this.data) {
      yield entry;
    }
  }
}

const station = new WeatherStation('New York');
station.fetchWeather().then(() => {
  const generator = station.weatherDataGenerator();
  print("Generated Weather Data:", generator.next().value);
});

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyStation = new Proxy(station, handler);
proxyStation.location = 'Los Angeles';
