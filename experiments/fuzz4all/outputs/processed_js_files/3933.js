class WeatherStation {
  constructor(location) {
    this.location = location;
    this.sensors = [];
  }
  
  addSensor(sensor) {
    this.sensors.push(sensor);
  }
  
  async *getSensorData() {
    for (const sensor of this.sensors) {
      yield await sensor.fetchData();
    }
  }
}

class Sensor {
  constructor(type) {
    this.type = type;
  }
  
  async fetchData() {
     
    return new Promise((resolve) => {
      setTimeout(() => resolve(`${this.type}: ${Math.random() * 100}`), 1000);
    });
  }
}

(async () => {
  const station = new WeatherStation('Downtown');
  const temperatureSensor = new Sensor('Temperature');
  const humiditySensor = new Sensor('Humidity');

  station.addSensor(temperatureSensor);
  station.addSensor(humiditySensor);

  for await (const data of station.getSensorData()) {
    print(`Sensor Data from ${station.location}:`, data);
  }
})();
