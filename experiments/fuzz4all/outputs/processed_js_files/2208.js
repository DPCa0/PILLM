 

class ReactiveStore {
  constructor(initialState = {}) {
    this.state = initialState;
    this.subscribers = new Set();
    return this._createProxy(this.state);
  }

  _createProxy(state) {
    return new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value;
        this._notifySubscribers(property);
        return true;
      },
      get: (target, property) => {
        if (typeof target[property] === 'object' && target[property] !== null) {
          return this._createProxy(target[property]);
        }
        return target[property];
      },
    });
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  _notifySubscribers(property) {
    this.subscribers.forEach(callback => callback(property, this.state));
  }

  async *[Symbol.asyncIterator]() {
    while (true) {
      let resolve;
      const promise = new Promise(res => resolve = res);
      this.subscribe((property, state) => resolve({ property, state }));
      yield promise.then(result => {
        this.unsubscribe(resolve);
        return result;
      });
    }
  }
}

 
const store = new ReactiveStore({ count: 0 });

store.subscribe((prop, state) => {
  print(`Property ${prop} changed to`, state[prop]);
});

(async () => {
  for await (const { property, state } of store) {
    print(`Async iteration detected change in ${property}:`, state[property]);
    if (state.count >= 3) break;
  }
})();

store.count = 1;
store.count = 2;
store.count = 3;
