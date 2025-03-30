 

class WeatherStation {
  constructor(location) {
    this.location = location;
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }

  async fetchWeather() {
    const response = await fetch(`https: 
    const weatherData = await response.json();
    this.notify(weatherData);
  }
}

class WeatherDisplay {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    print(`${this.name} Display:`);
    print(`Temperature: ${data.current.temp_c}°C`);
    print(`Condition: ${data.current.condition.text}`);
  }
}

 
(async () => {
  const station = new WeatherStation("London");
  const display1 = new WeatherDisplay("Mobile");
  const display2 = new WeatherDisplay("Web");

  station.subscribe(display1);
  station.subscribe(display2);

   
  await station.fetchWeather();

   
  const additionalDisplay = new WeatherDisplay("Smartwatch");
  const allDisplays = new Set([...station.observers, additionalDisplay]);

  allDisplays.forEach(display => display.update({
    current: { temp_c: 15, condition: { text: "Cloudy" } }
  }));
})();
