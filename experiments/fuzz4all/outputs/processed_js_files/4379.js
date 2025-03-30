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
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { url, content: `Data from ${url}` };  
      resolve(data);
    }, 1000);
  });
};

 
function* lazyDataProcess(data) {
  for (const item of data) {
    yield `Processed ${item.content}`;
  }
}

 
const handler = {
  set(obj, prop, value) {
    if (typeof value !== 'string') {
      throw new TypeError('Value must be a string');
    }
    obj[prop] = value;
    return true;
  }
};

const user = new Proxy({}, handler);

 
(async () => {
  const emitter = new EventEmitter();

  emitter.on('dataReceived', (data) => {
    print('Data received:', data);
    const processedData = lazyDataProcess([data]);
    print(processedData.next().value);
  });

  emitter.on('error', (err) => {
    console.error('Error:', err);
  });

  try {
    const data = await fetchData('https://example.com');
    emitter.emit('dataReceived', data);
  } catch (err) {
    emitter.emit('error', err);
  }

  try {
    user.name = 'John Doe';
    print('User name:', user.name);
    user.age = 30;  
  } catch (err) {
    console.error('Proxy Error:', err.message);
  }
})();
