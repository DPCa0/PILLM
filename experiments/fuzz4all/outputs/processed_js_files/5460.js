class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(listener);
  }
  emit(event, ...args) {
    if (this.events.has(event)) {
      for (const listener of this.events.get(event)) {
        listener(...args);
      }
    }
  }
  off(event, listener) {
    if (this.events.has(event)) {
      this.events.get(event).delete(listener);
    }
  }
}

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const throttledRequest = (function () {
  let isThrottled = false;
  const requests = [];
  
  return function (request) {
    if (isThrottled) {
      requests.push(request);
      return;
    }

    request();
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (requests.length > 0) {
        requests.shift()();
      }
    }, 1000);
  };
})();

const asyncOperation = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      print('Async operation completed');
      resolve();
    }, Math.random() * 1000);
  });
};

const main = async () => {
  const emitter = new EventEmitter();

  const listener = async (msg) => {
    print(`Received: ${msg}`);
    await asyncOperation();
  };

  emitter.on('event', debounce(listener, 300));

  for (let i = 0; i < 5; i++) {
    throttledRequest(() => emitter.emit('event', `Message ${i}`));
  }
};

main();
