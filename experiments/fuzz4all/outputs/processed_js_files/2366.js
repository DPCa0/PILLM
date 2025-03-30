class WeatherStation {
  #temperature = 0;  

  constructor(location) {
    this.location = location;
    this.subscribers = new Set();
  }

   
  static convertToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }

  set temperature(temp) {
    const oldTemp = this.#temperature;
    this.#temperature = temp;
    this.notifySubscribers(oldTemp);
  }

  get temperature() {
    return this.#temperature;
  }

  subscribe(observer) {
    this.subscribers.add(observer);
  }

  unsubscribe(observer) {
    this.subscribers.delete(observer);
  }

  notifySubscribers(oldTemp) {
    const event = { oldTemp, newTemp: this.#temperature };
    this.subscribers.forEach(subscriber => subscriber.update(event));
  }
}

class WeatherApp {
  constructor(name) {
    this.name = name;
  }

  update(event) {
    const { oldTemp, newTemp } = event;
    console.log(
      `${this.name} noticed temperature change from ${oldTemp}° to ${newTemp}°`
    );
  }
}

const station = new WeatherStation('San Francisco');
const app1 = new WeatherApp('WeatherPro');
const app2 = new WeatherApp('ClimateMonitor');

station.subscribe(app1);
station.subscribe(app2);

station.temperature = 75;
station.temperature = WeatherStation.convertToCelsius(100);
