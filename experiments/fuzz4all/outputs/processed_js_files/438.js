class WeatherStation {
  constructor(location) {
    this.location = location;
    this.readings = new Map();
  }

   
  async fetchWeather() {
    const temperature = Math.random() * 30;
    const humidity = Math.random() * 100;
    return { temperature, humidity };
  }

  async updateReadings() {
    const { temperature, humidity } = await this.fetchWeather();
    const timestamp = new Date().toISOString();
    this.readings.set(timestamp, { temperature, humidity });
  }

   
  get lastReading() {
    return new Proxy(this.readings, {
      get: (target, prop) => {
        if (prop === 'latest') {
          const latestKey = [...target.keys()].pop();
          return target.get(latestKey);
        }
        return target[prop];
      }
    }).latest;
  }
}

(async () => {
  const station = new WeatherStation('San Francisco');
  
  await station.updateReadings();
  await station.updateReadings();

  print(`Weather Station: ${station.location}`);
  print('Last Reading:', station.lastReading);
})();
