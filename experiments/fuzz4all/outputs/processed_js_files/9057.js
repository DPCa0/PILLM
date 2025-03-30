const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  emit(event, args) {
    if (this.events[event]) this.events[event].forEach(listener => listener(args));
  }
}

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const processInput = debounce((input) => {
  print(`Processing input: ${input}`);
}, 300);

const emitter = new EventEmitter();

emitter.on('dataReceived', (data) => {
  print('Data received:', data);
});

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);
  if (data) emitter.emit('dataReceived', data);

  processInput('Debounce test 1');
  processInput('Debounce test 2');
  processInput('Debounce test 3');
})();
