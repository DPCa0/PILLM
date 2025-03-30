class Observable {
  constructor(value) {
    this.handlers = new Set();
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.notify();
    }
  }

  subscribe(handler) {
    this.handlers.add(handler);
  }

  unsubscribe(handler) {
    this.handlers.delete(handler);
  }

  notify() {
    this.handlers.forEach(handler => handler(this._value));
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncRange(start, end, step) {
  for (let i = start; i < end; i += step) {
    await delay(100);  
    yield i;
  }
}

(async () => {
  const observable = new Observable(0);

  observable.subscribe(value => {
    print(`Subscriber 1: Value changed to ${value}`);
  });

  observable.subscribe(value => {
    print(`Subscriber 2: New value is ${value}`);
  });

  for await (let num of asyncRange(1, 10, 1)) {
    observable.value = num;
  }
})();
