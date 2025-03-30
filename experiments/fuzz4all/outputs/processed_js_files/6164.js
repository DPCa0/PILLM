class Observable {
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

const observable = new Observable();

const asyncTask = async () => {
  const simulateAsyncOperation = () => new Promise(resolve => setTimeout(() => resolve("Data Loaded"), 1000));

  try {
    const result = await simulateAsyncOperation();
    observable.notify(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

const logData = (data) => print(`Log Subscriber: ${data}`);
const transformData = (data) => print(`Transform Subscriber: ${data.toUpperCase()}`);

observable.subscribe(logData);
observable.subscribe(transformData);

asyncTask();

const proxyHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return target[property];
    } else {
      print(`Property ${property} doesn't exist`);
      return undefined;
    }
  }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, proxyHandler);

print(proxyObject.a); // Accessing property: a
print(proxyObject.b); // Accessing property: b
print(proxyObject.c); // Property c doesn't exist
