class Observable {
  constructor(value) {
    this._value = value;
    this._listeners = new Set();
  }
  
  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);  
  }

  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this._notify();
    }
  }

  get value() {
    return this._value;
  }

  _notify() {
    this._listeners.forEach(listener => listener(this._value));
  }
}

 
async function* asyncRange(start, end) {
  for (let i = start; i < end; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield i;
  }
}

(async () => {
  const obs = new Observable(0);

  const unsubscribe = obs.subscribe(val => print(`Value changed to: ${val}`));

   
  obs.value = 10;
  obs.value = 20;

   
  unsubscribe();

   
  obs.value = 30;

   
  for await (let num of asyncRange(0, 3)) {
    print(`Async generator produced: ${num}`);
  }
})();

 
const target = { a: 1, b: 2 };
const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

print(proxy.a);  
proxy.b = 42;  
