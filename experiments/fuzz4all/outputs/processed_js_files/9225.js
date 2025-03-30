(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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

  const fetchData = async (url) => {
    await delay(1000);
    return { data: `Data from ${url}` };
  };

  const cacheProxy = (fn) => {
    const cache = new Map();
    return new Proxy(fn, {
      apply(target, thisArg, args) {
        const argStr = JSON.stringify(args);
        if (!cache.has(argStr)) {
          cache.set(argStr, fn.apply(thisArg, args));
        }
        return cache.get(argStr);
      }
    });
  };

  const proxiedFetch = cacheProxy(fetchData);

  const eventEmitter = new EventEmitter();
  eventEmitter.on('data', (data) => {
    print(`Received: ${data}`);
  });

  for (const url of ['https://api.example.com/a', 'https://api.example.com/b']) {
    const result = await proxiedFetch(url);
    eventEmitter.emit('data', result.data);
  }
})();
