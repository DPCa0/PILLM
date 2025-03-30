const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const dynamicImportModule = async (moduleName) => {
  try {
    const module = await import(`./modules/${moduleName}.js`);
    module.default();
  } catch (e) {
    console.error('Failed to load module:', e);
  }
};

class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== fn);
  }

  notify(data) {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}

const createWorker = (workerScript) => {
  const blob = new Blob([workerScript], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));
  return worker;
};

 
const logger = (message) => print(`Received: ${message}`);
const observable = new Observable();
observable.subscribe(logger);
observable.notify('Hello, Observer Pattern!');

const workerScript = `
  self.onmessage = function(e) {
    const result = e.data * 2;
    self.postMessage(result);
  }
`;

const worker = createWorker(workerScript);
worker.onmessage = (e) => print('Worker result:', e.data);
worker.postMessage(10);

 
const throttledLog = throttle(console.log, 2000);
setInterval(() => throttledLog('