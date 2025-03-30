 
class Observer {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(fn) {
    this.subscribers.add(fn);
  }
  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const observable = new Proxy({}, {
  observers: new Map(),
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    }
    const observer = new Observer();
    this.observers.set(prop, observer);
    return observer;
  },
  set(target, prop, value) {
    target[prop] = value;
    if (this.observers.has(prop)) {
      this.observers.get(prop).notify(value);
    }
    return true;
  }
});

const complexComputation = (arr, transform) => 
  arr.flatMap(item => [item, transform(item)])
     .filter((_, index) => index % 2 === 0)
     .reduce((acc, val) => acc.concat(val), []);

observable.name.subscribe(name => print(`Hello, ${name}!`));

observable.name = 'World';

const transformFunction = x => x * 2;
const result = complexComputation([1, 2, 3], transformFunction);
print(result);  
