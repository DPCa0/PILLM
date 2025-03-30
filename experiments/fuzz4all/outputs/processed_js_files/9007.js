class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }

  off(event, listenerToRemove) {
    if (this.events.has(event)) {
      this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
    }
  }
}

const fetchWithRetry = async (url, retries = 3) => {
  while (retries > 0) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch data');
      return await response.json();
    } catch (error) {
      console.warn(`Fetch attempt failed, retries left: ${--retries}`);
      if (retries === 0) throw error;
    }
  }
};

const asyncIterable = {
  *[Symbol.asyncIterator]() {
    for (let i = 1; i <= 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      yield `Value ${i}`;
    }
  }
};

const runProgram = async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('data', data => print('Data received:', data));
  eventEmitter.on('error', error => console.error('Error:', error.message));

  try {
    const data = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1');
    eventEmitter.emit('data', data);
  } catch (error) {
    eventEmitter.emit('error', error);
  }

  print('Async Iteration Results:');
  for await (const value of asyncIterable) {
    print(value);
  }
};

runProgram();
