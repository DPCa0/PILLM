 
const LoggerMixin = Base => class extends Base {
  log(message) {
    print(`[${this.constructor.name}]: ${message}`);
  }
};

 
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
    this.observers.forEach(observer => observer.update(data));
  }
}

 
class Notifier extends LoggerMixin(Observable) {
  sendNotification(message) {
    this.log(`Sending notification with message: ${message}`);
    this.notify(message);
  }
}

 
class Observer {
  constructor(name) {
    this.name = name;
  }
  async update(message) {
    const reversedName = [...this.name].reverse().join('');
    await Promise.resolve(print(`[${reversedName}] received: ${message}`));
  }
}

 
const notifierHandler = {
  get(target, prop, receiver) {
    if (prop === 'sendNotification') {
      return function (...args) {
        print('Notification intercepted!');
        return Reflect.get(target, prop, receiver).apply(target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const notifier = new Proxy(new Notifier(), notifierHandler);
const observer1 = new Observer("Alice");
const observer2 = new Observer("Bob");

notifier.subscribe(observer1);
notifier.subscribe(observer2);

notifier.sendNotification('Advanced JavaScript Features!');
