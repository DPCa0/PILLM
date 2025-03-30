class ComplexSystem {
  constructor() {
    this.state = new WeakMap();
    this.eventListeners = new Map();
  }

  setState(key, value) {
    this.state.set(key, value);
    this.triggerEvent(key);
  }

  getState(key) {
    return this.state.get(key);
  }

  addEventListener(key, callback) {
    if (!this.eventListeners.has(key)) {
      this.eventListeners.set(key, []);
    }
    this.eventListeners.get(key).push(callback);
  }

  triggerEvent(key) {
    if (this.eventListeners.has(key)) {
      this.eventListeners.get(key).forEach(callback => callback(this.getState(key)));
    }
  }
}

 
const system = new Proxy(new ComplexSystem(), {
  set(target, property, value) {
    if (property === 'secret') {
      print('Cannot modify the secret property!');
      return false;
    }
    return Reflect.set(target, property, value);
  }
});

 
const SECRET_KEY = Symbol('secret');
system.setState(SECRET_KEY, 'SuperSecretValue');

 
const delayedComputation = (x, y) => () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(x + y), 1000);
  }).then(result => print(`Result is: ${result}`));

 
system.addEventListener(SECRET_KEY, (newValue) => {
  print(`The secret value has changed to: ${newValue}`);
  delayedComputation(42, 58)();
});

 
async function* asyncGenerator() {
  const values = ['A', 'B', 'C'];
  for (let value of values) {
    await new Promise(resolve => setTimeout(resolve, 500));
    yield value;
  }
}

(async () => {
  for await (let value of asyncGenerator()) {
    print(`Generated value: ${value}`);
  }
})();

 
system.secret = 'TryToChange';
