 

class Observable {
  constructor() {
    this.observers = new Set();
  }
  
  subscribe(observer) {
    this.observers.add(observer);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

class Subject {
  constructor() {
    this.state = {};
    this.observable = new Observable();
    return new Proxy(this, {
      set: (target, prop, value) => {
        target.state[prop] = value;
        target.observable.notify({ [prop]: value });
        return true;
      }
    });
  }
}

async function* asyncGenerator() {
  const items = [1, 2, 3, 4, 5];
  for (const item of items) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item * item;
  }
}

(async () => {
  const subject = new Subject();

  const observer1 = data => print(`Observer 1: Received update - `, data);
  const observer2 = data => print(`Observer 2: Received update - `, data);
  
  subject.observable.subscribe(observer1);
  subject.observable.subscribe(observer2);

  subject.someProp = "Initial value";

  subject.someProp = "Updated value";
  
  const generator = asyncGenerator();
  for await (const value of generator) {
    print(`Async Generator: ${value}`);
    subject.someProp = value;
  }
})();
