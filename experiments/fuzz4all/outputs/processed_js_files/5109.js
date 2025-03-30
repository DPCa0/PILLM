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

const asyncOperation = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function complexOperation() {
  print("Starting complex operation...");
  
  await asyncOperation(1000);
  print("Operation in progress...");
  
  await asyncOperation(1000);
  print("Operation nearing completion...");
  
  return "Operation Completed";
}

(async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('start', () => print('Complex operation started'));
  eventEmitter.on('progress', (percentage) => print(`Progress: ${percentage}%`));
  eventEmitter.on('end', (result) => print(result));

  eventEmitter.emit('start');

  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += 20;
    eventEmitter.emit('progress', progress);

    if (progress === 100) {
      clearInterval(progressInterval);
    }
  }, 500);

  const result = await complexOperation();
  eventEmitter.emit('end', result);
})();
