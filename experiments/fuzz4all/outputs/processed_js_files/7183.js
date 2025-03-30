const crypto = require('crypto');

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

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }
}

const asyncOp = async (input) => {
  return new Promise((resolve) => setTimeout(() => resolve(input * 2), 1000));
};

const complexFunction = async () => {
  const eventEmitter = new EventEmitter();

  eventEmitter.on('hash', (data) => {
    const hash = crypto.createHash('sha256').update(data.toString()).digest('hex');
    print(`Hash of ${data}: ${hash}`);
  });

  const dataArray = [1, 2, 3, 4, 5];
  const results = await Promise.all(dataArray.map(asyncOp));
  
  results.forEach(result => {
    eventEmitter.emit('hash', result);
  });
};

complexFunction();
