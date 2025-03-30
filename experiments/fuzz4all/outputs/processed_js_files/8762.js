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

const asyncOperation = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num > 5) {
        resolve(`Success: ${num}`);
      } else {
        reject(`Failure: ${num}`);
      }
    }, 1000);
  });
};

(async () => {
  const ee = new EventEmitter();
  
  ee.on('success', message => print(`Event received: ${message}`));
  ee.on('failure', message => console.error(`Event received: ${message}`));
  
  try {
    const message = await asyncOperation(10);
    ee.emit('success', message);
  } catch (error) {
    ee.emit('failure', error);
  }
  
  try {
    const message = await asyncOperation(3);
    ee.emit('success', message);
  } catch (error) {
    ee.emit('failure', error);
  }
})();
