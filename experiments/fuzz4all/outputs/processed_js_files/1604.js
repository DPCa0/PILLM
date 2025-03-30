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
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(...args));
    }
  }
}

const asyncHandler = fn => (...args) => Promise.resolve(fn(...args));

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const pipeline = [
  asyncHandler(async (data) => {
    print('First step:', data);
    await delay(500);
    return data + 1;
  }),
  asyncHandler(async (data) => {
    print('Second step:', data);
    await delay(500);
    return data * 2;
  }),
  asyncHandler(async (data) => {
    print('Third step:', data);
    await delay(500);
    return data - 3;
  })
];

const executePipeline = async (initialValue) => {
  let result = initialValue;
  for (const fn of pipeline) {
    result = await fn(result);
  }
  return result;
};

const eventEmitter = new EventEmitter();

eventEmitter.on('start', async (initialValue) => {
  print('Pipeline started');
  const result = await executePipeline(initialValue);
  print('Pipeline finished with result:', result);
});

eventEmitter.emit('start', 5);
