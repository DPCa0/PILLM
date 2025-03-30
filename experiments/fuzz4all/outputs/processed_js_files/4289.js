const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), delay);
  };
};

const throttle = (func, limit) => {
  let lastFunc, lastRan;
  return function(...args) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(null, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener.apply(null, args));
  }

  off(event, listenerToRemove) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
  }
}

const emitter = new EventEmitter();

emitter.on('dataReceived', data => {
  print('Data received:', data);
});

const main = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    emitter.emit('dataReceived', data.slice(0, 5));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const logInput = debounce((input) => print('Input:', input), 300);
const throttledLog = throttle(() => print('Throttled log'), 1000);

document.addEventListener('input', event => logInput(event.target.value));
setInterval(throttledLog, 500);

main();
