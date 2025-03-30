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

const asyncOperation = (delay) => new Promise(resolve => setTimeout(resolve, delay));

async function* fetchWithTimeout(iterable, timeout) {
  for (let item of iterable) {
    yield Promise.race([item, new Promise((_, reject) => setTimeout(() => reject('Timeout'), timeout))]);
  }
}

async function main() {
  const eventEmitter = new EventEmitter();
  
  eventEmitter.on('data', data => {
    print('Data received:', data);
  });

  eventEmitter.on('error', error => {
    console.error('Error:', error);
  });

  const dataTasks = [
    asyncOperation(1000).then(() => 'Task 1 complete'),
    asyncOperation(2000).then(() => 'Task 2 complete'),
    asyncOperation(3000).then(() => 'Task 3 complete')
  ];
  
  for await (const result of fetchWithTimeout(dataTasks, 2500)) {
    try {
      const data = await result;
      eventEmitter.emit('data', data);
    } catch (error) {
      eventEmitter.emit('error', error);
    }
  }
}

main();
