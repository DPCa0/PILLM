class Observable {
  constructor(value) {
    this._value = value;
    this._subscribers = new Set();
  }

  subscribe(callback) {
    this._subscribers.add(callback);
    return () => this._subscribers.delete(callback);
  }

  notify() {
    this._subscribers.forEach(callback => callback(this._value));
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.notify();
    }
  }

  get value() {
    return this._value;
  }
}

const reactiveSum = (a, b) => {
  const result = new Observable(a.value + b.value);

  const update = () => result.value = a.value + b.value;
  const unsubA = a.subscribe(update);
  const unsubB = b.subscribe(update);

  result.unsubscribeAll = () => {
    unsubA();
    unsubB();
  };

  return result;
};

 
const a = new Observable(5);
const b = new Observable(10);

 
const sum = reactiveSum(a, b);

 
const logSum = (value) => print(`Sum is now: ${value}`);
const unsubscribeLog = sum.subscribe(logSum);

 
a.value = 20;  
b.value = 30;  

 
unsubscribeLog();

 
a.value = 15;
b.value = 25;

 
sum.unsubscribeAll();
