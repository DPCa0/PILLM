class Weather {
  constructor(city) {
    this.city = city;
    this.temperature = null;
  }

  async fetchWeatherData() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          city: this.city,
          temperature: (Math.random() * 35).toFixed(1),
        });
      }, 1000);
    });
  }

  async updateTemperature() {
    const data = await this.fetchWeatherData();
    this.temperature = data.temperature;
  }
}

const weatherData = new Proxy({}, {
  get(target, property) {
    return property in target ? target[property] : 'Data not available';
  },
  set(target, property, value) {
    print(`Setting value ${value} to ${property}`);
    target[property] = value;
    return true;
  }
});

(async () => {
  const cities = ['New York', 'London', 'Tokyo'];

  const weatherReports = await Promise.all(cities.map(async (city) => {
    const weather = new Weather(city);
    await weather.updateTemperature();
    weatherData[city] = weather.temperature;
    return `Weather in ${city}: ${weatherData[city]}°C`;
  }));

  print(weatherReports.join('\n'));
})();
