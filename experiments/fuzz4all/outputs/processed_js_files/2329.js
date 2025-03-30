class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }

  off(event, listener) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(l => l !== listener));
    }
  }
}

class WeatherStation extends EventEmitter {
  constructor() {
    super();
    this.weatherData = { temp: 20, humidity: 50 };
    this.startWeatherUpdates();
  }

  startWeatherUpdates() {
    setInterval(() => {
      this.weatherData = {
        temp: Math.floor(Math.random() * 35),
        humidity: Math.floor(Math.random() * 100)
      };
      this.emit('update', this.weatherData);
    }, 2000);
  }

  getWeatherData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.weatherData), 1000);
    });
  }
}

(async () => {
  const weatherStation = new WeatherStation();

  weatherStation.on('update', data => {
    print('Weather Update:', data);
  });

  weatherStation.once('update', data => {
    print('First Update:', data);
  });

  try {
    const currentWeather = await weatherStation.getWeatherData();
    print('Current Weather:', currentWeather);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
})();
