 

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithTimeout = async (url, timeout) => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchPromise = fetch(url, { signal });
  const timeoutPromise = delay(timeout).then(() => controller.abort());

  try {
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return response.ok ? await response.json() : null;
  } catch (e) {
    return null;
  }
};

const emitter = new EventEmitter();
emitter.on('data', data => print('Received data:', data));

(async () => {
  const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/todos/1', 3000);
  if (data) {
    emitter.emit('data', data);
  } else {
    print('Failed to fetch data');
  }
})();

 
const target = {
  name: "JavaScript",
  level: "Advanced"
};

const handler = {
  set: function (obj, prop, value) {
    print(`Property ${prop} set to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

proxy.level = "Expert";  
