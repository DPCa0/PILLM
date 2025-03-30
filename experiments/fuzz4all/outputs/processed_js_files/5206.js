class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (!this.events.has(event)) return;
    for (const listener of this.events.get(event)) {
      listener(...args);
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const addGreeting = (str) => `Hello, ${str}`;

const processName = pipe(capitalize, addGreeting);

const eventEmitter = new EventEmitter();

eventEmitter.on('dataFetched', (data) => {
  print('Fetched User:', processName(data.name));
});

(async function () {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    eventEmitter.emit('dataFetched', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
