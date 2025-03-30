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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

const asyncDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ComplexCalculator {
  static #factorial(n) {
    return n <= 1 ? 1 : n * ComplexCalculator.#factorial(n - 1);
  }

  static async calculateAndEmit(emitter, event, number) {
    const result = ComplexCalculator.#factorial(number);
    await asyncDelay(1000);  
    emitter.emit(event, result);
  }
}

const emitter = new EventEmitter();

emitter.on('factorial', (result) => {
  print(`Factorial calculated: ${result}`);
});

ComplexCalculator.calculateAndEmit(emitter, 'factorial', 5);

 
const handler = {
  get(target, propKey, receiver) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`Called: ${propKey} with ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

const proxiedCalculator = new Proxy(ComplexCalculator, handler);
proxiedCalculator.calculateAndEmit(emitter, 'factorial', 6);
