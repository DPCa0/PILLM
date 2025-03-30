class Observable {
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
      for (const callback of this.subscribers.get(event)) {
        callback(data);
      }
    }
  }
}

const asyncOperation = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Processed ${data}`), 1000);
  });
};

(async () => {
  const observable = new Observable();

  observable.subscribe('event1', async (data) => {
    const result = await asyncOperation(data);
    print(result);
  });

  observable.subscribe('event1', (data) => {
    print(`Logging: ${data}`);
  });

  observable.emit('event1', 'Sample Data');

  const proxyHandler = {
    get: (target, prop) => {
      print(`Accessing property '${prop}'`);
      return prop in target ? target[prop] : 'Property does not exist';
    },
  };

  const targetObject = { a: 1, b: 2 };
  const proxyObject = new Proxy(targetObject, proxyHandler);

  print(proxyObject.a);  
  print(proxyObject.c);  
})();
