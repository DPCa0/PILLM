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

class AdvancedCalculator {
  constructor() {
    this.emitter = new EventEmitter();
  }

  async performOperation(operation, ...args) {
    const result = await operation(...args);
    this.emitter.emit('operationPerformed', operation.name, result);
    return result;
  }

  onOperationPerformed(listener) {
    this.emitter.on('operationPerformed', listener);
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const complexAddition = async (a, b) => {
  await delay(100);
  return a + b;
};

const calculator = new AdvancedCalculator();

calculator.onOperationPerformed((operation, result) => {
  print(`Operation ${operation} performed with result: ${result}`);
});

(async () => {
  const result1 = await calculator.performOperation(complexAddition, 3, 7);
  print(`Final Result 1: ${result1}`);

  const result2 = await calculator.performOperation(complexAddition, 10, 5);
  print(`Final Result 2: ${result2}`);
})();
