class Observable {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(observer) {
    this.subscribers.add(observer);
  }

  unsubscribe(observer) {
    this.subscribers.delete(observer);
  }

  notify(data) {
    this.subscribers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  update(data) {
    print(`${this.name} received data:`, data);
  }
}

const mixin = (target, ...sources) => Object.assign(target.prototype, ...sources);

const TimestampMixin = {
  timestamp() {
    print(`Timestamp: ${new Date().toISOString()}`);
  }
};

mixin(Observable, TimestampMixin);

const observable = new Observable();

const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

observable.subscribe(observer1);
observable.subscribe(observer2);

observable.timestamp();

observable.notify({ event: 'Event 1', message: 'Hello, Observers!' });

observable.unsubscribe(observer2);

observable.notify({ event: 'Event 2', message: 'Hello, Observer 1!' });

(async () => {
  print('Start async operation');
  await new Promise(resolve => setTimeout(resolve, 1000));
  print('Async operation completed');
})();
