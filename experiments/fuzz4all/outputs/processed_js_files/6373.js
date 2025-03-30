class Observable {
  constructor() {
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
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    print(`${this.name} received data: ${data}`);
  }
}

class TemperatureSensor extends Observable {
  constructor() {
    super();
    this.temperature = 20;  
  }

  changeTemperature() {
    this.temperature += Math.floor(Math.random() * 5 - 2);
    this.notify(this.temperature);
  }
}

class TemperatureLogger extends Observer {
  constructor(name) {
    super(name);
    this.log = [];
  }

  update(data) {
    super.update(data);
    this.log.push(data);
    if (this.log.length > 5) this.log.shift();
    print(`Log for ${this.name}: ${this.log.join(', ')}`);
  }
}

 
const sensor = new TemperatureSensor();
const logger1 = new TemperatureLogger('Logger1');
const logger2 = new TemperatureLogger('Logger2');

 
sensor.subscribe(logger1);
sensor.subscribe(logger2);

 
setInterval(() => sensor.changeTemperature(), 1000);
