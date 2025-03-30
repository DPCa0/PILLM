class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

class Calculator extends EventEmitter {
  constructor() {
    super();
  }

  add(a, b) {
    const result = a + b;
    this.emit('add', a, b, result);
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.emit('subtract', a, b, result);
    return result;
  }
}

const calc = new Calculator();

calc.on('add', (a, b, result) => {
  print(`${a} + ${b} = ${result}`);
});

calc.on('subtract', (a, b, result) => {
  print(`${a} - ${b} = ${result}`);
});

print('Result of add:', calc.add(10, 5));  
print('Result of subtract:', calc.subtract(10, 5));  

 
const handler = {
  get: (target, prop, receiver) => {
    const origMethod = target[prop];
    return function (...args) {
      print(`Method ${prop} called with arguments: ${args}`);
      return origMethod.apply(this, args);
    };
  }
};

const proxiedCalc = new Proxy(calc, handler);

print('Proxied add:', proxiedCalc.add(20, 10));
print('Proxied subtract:', proxiedCalc.subtract(20, 10));
