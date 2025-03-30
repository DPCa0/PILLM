class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }
  
  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener.apply(this, args));
    }
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async (url) => {
  print(`Fetching data from ${url}`);
  await delay(1000);
  return `Data from ${url}`;
}

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const eventEmitter = new EventEmitter();

eventEmitter.on('dataFetch', debounce(async (url) => {
  const data = await fetchData(url);
  print(data);
}, 200));

eventEmitter.emit('dataFetch', 'https://api.example.com/data1');
eventEmitter.emit('dataFetch', 'https://api.example.com/data2');

class CustomArray extends Array {
  unique() {
    return [...new Set(this)];
  }
}

const numbers = new CustomArray(1, 2, 2, 3, 4, 4, 5);
print(numbers.unique());
