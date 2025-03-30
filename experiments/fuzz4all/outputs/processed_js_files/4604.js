class Observable {
  constructor(value) {
    this._value = value;
    this._subscribers = new Set();
  }
  
  subscribe(callback) {
    this._subscribers.add(callback);
    callback(this._value);  
    return () => this._subscribers.delete(callback);  
  }
  
  notify() {
    for (const callback of this._subscribers) {
      callback(this._value);
    }
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

const asyncProcess = (delay, callback) => 
  new Promise(resolve => 
    setTimeout(() => resolve(callback()), delay)
  );

async function complexAsyncFlow(observable) {
  try {
    const firstStep = await asyncProcess(1000, () => observable.value * 2);
    print('First Step:', firstStep);

    const secondStep = await asyncProcess(1000, () => firstStep + 10);
    print('Second Step:', secondStep);

    observable.value = secondStep;
  } catch (error) {
    console.error('Error in async flow:', error);
  }
}

const myObservable = new Observable(5);

const unsubscribe = myObservable.subscribe(value => {
  print('Subscriber notified with value:', value);
});

complexAsyncFlow(myObservable);

 
setTimeout(unsubscribe, 4000);
