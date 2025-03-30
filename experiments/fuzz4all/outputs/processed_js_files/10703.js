 
class WeatherStation {
  #temperature;
  #observers = new Set();

  constructor(initialTemperature = 20) {
    this.#temperature = initialTemperature;
  }

   
  #notifyObservers() {
    this.#observers.forEach(observer => observer(this.#temperature));
  }

   
  setTemperature(newTemperature) {
    if (this.#temperature !== newTemperature) {
      this.#temperature = newTemperature;
      this.#notifyObservers();
    }
  }

   
  addObserver(observer) {
    this.#observers.add(observer);
  }

   
  removeObserver(observer) {
    this.#observers.delete(observer);
  }
}

 
const weatherStation = new WeatherStation();
const handler = {
  set: function(target, property, value) {
    print(`Changing ${property} from ${target[property]} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxiedWeatherStation = new Proxy(weatherStation, handler);

 
const displayObserver = temperature => {
  print(`The temperature is now ${temperature}°C.`);
};
const alertObserver = temperature => {
  if (temperature > 30) {
    print(`Alert! Temperature is too high: ${temperature}°C.`);
  }
};

 
proxiedWeatherStation.addObserver(displayObserver);
proxiedWeatherStation.addObserver(alertObserver);

 
proxiedWeatherStation.setTemperature(25);
proxiedWeatherStation.setTemperature(32);
