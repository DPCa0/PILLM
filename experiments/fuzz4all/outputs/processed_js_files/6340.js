class ReactiveStore {
  constructor() {
    this.store = new Map();
    this.subscribers = new Map();
  }

  set(key, value) {
    this.store.set(key, value);
    this.notify(key);
  }

  get(key) {
    return this.store.get(key);
  }

  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key).push(callback);
  }

  notify(key) {
    if (this.subscribers.has(key)) {
      for (const callback of this.subscribers.get(key)) {
        callback(this.get(key));
      }
    }
  }
}

const proxyHandler = {
  get(target, prop) {
    return typeof target[prop] === 'function' ? target[prop].bind(target) : target[prop];
  },
  set(target, prop, value) {
    target.set(prop, value);
    return true;
  }
};

const store = new ReactiveStore();
const reactiveStore = new Proxy(store, proxyHandler);

 
reactiveStore.subscribe('data', (newValue) => {
  print(`Data changed: ${newValue}`);
});

reactiveStore.data = 'Hello, world!';
reactiveStore.data = 'Hello, JavaScript!';
