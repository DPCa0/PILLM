class Observer {
  constructor() {
    this.subscribers = new Map();
  }
  
  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event).push(callback);
  }
  
  emit(event, data) {
    if (this.subscribers.has(event)) {
      this.subscribers.get(event).forEach(callback => callback(data));
    }
  }
}

const observable = new Proxy(new Observer(), {
  get(target, property, receiver) {
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      throw new ReferenceError(`Property ${property} does not exist`);
    }
  }
});

function asyncOperation(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('Success') : reject('Failure');
    }, duration);
  });
}

(async function() {
  observable.subscribe('success', data => print(`Yay: ${data}`));
  observable.subscribe('failure', data => console.error(`Oops: ${data}`));

  for await (const result of [asyncOperation(1000), asyncOperation(2000), asyncOperation(1500)]) {
    result
      .then(data => observable.emit('success', data))
      .catch(error => observable.emit('failure', error));
  }
})();
