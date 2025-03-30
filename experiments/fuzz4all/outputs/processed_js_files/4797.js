class ReactiveState {
  #state;
  #listeners;

  constructor(initialState = {}) {
    this.#state = new Proxy(initialState, this.#proxyHandler());
    this.#listeners = new Map();
  }

  #proxyHandler() {
    return {
      get: (target, prop) => target[prop],
      set: (target, prop, value) => {
        if (target[prop] !== value) {
          target[prop] = value;
          this.#emitChange(prop, value);
        }
        return true;
      },
    };
  }

  #emitChange(prop, value) {
    if (this.#listeners.has(prop)) {
      this.#listeners.get(prop).forEach(listener => listener(value));
    }
  }

  subscribe(prop, listener) {
    if (!this.#listeners.has(prop)) {
      this.#listeners.set(prop, []);
    }
    this.#listeners.get(prop).push(listener);
  }

  get state() {
    return this.#state;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const state = new ReactiveState({ count: 0 });

state.subscribe('count', (newValue) => {
  print(`Count updated to: ${newValue}`);
});

async function incrementCounter() {
  for (let i = 1; i <= 5; i++) {
    await delay(1000);
    state.state.count = i;
  }
}

incrementCounter();
