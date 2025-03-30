class Observable {
  constructor(value) {
    this._value = value;
    this.subscribers = new Set();
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

  subscribe(subscriber) {
    this.subscribers.add(subscriber);
    subscriber(this._value);
  }

  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber(this._value));
  }
}

function derived(observables, compute) {
  const result = new Observable(compute(...observables.map(obs => obs.value)));
  
  observables.forEach(obs => 
    obs.subscribe(() => {
      result.value = compute(...observables.map(obs => obs.value));
    })
  );

  return result;
}

const a = new Observable(1);
const b = new Observable(2);

const sum = derived([a, b], (a, b) => a + b);
const product = derived([a, b], (a, b) => a * b);

const logSubscriber = (name) => (value) => print(`${name}: ${value}`);
sum.subscribe(logSubscriber('Sum'));
product.subscribe(logSubscriber('Product'));

a.value = 5;
b.value = 10;
