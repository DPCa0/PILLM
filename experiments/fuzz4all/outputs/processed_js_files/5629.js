 

 
class ReactiveValue {
  constructor(value) {
    this.value = value;
    this.subscribers = new Set();
  }
  
   
  get currentValue() {
    return this.value;
  }

  set currentValue(newValue) {
    this.value = newValue;
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  notify() {
    this.subscribers.forEach(callback => callback(this.value));
  }
}

 
const _reactive = Symbol('reactive');

 
function reactiveDecorator(reactiveObj) {
  return function(target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
      reactiveObj.subscribe(() => originalMethod.apply(this, args));
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

class Counter {
  constructor() {
    this[_reactive] = new ReactiveValue(0);
  }

  get value() {
    return this[_reactive].currentValue;
  }

  set value(val) {
    this[_reactive].currentValue = val;
  }

  @reactiveDecorator(this[_reactive])
  logValue() {
    print(`Current Value: ${this.value}`);
  }

  increment() {
    this.value += 1;
  }
}

 
const counter = new Counter();
counter.logValue();   
counter.increment();  
counter.increment();
