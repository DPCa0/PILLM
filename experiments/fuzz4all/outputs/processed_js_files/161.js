class ReactiveVar {
  #listeners = new Set();
  constructor(initialValue) {
    this._value = initialValue;
  }
  
  get value() {
    return this._value;
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.#listeners.forEach(listener => listener(newValue));
    }
  }

  subscribe(listener) {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }
}

function observe(obj, callback) {
  const handler = {
    get(target, property, receiver) {
      try {
        return new Proxy(target[property], handler);
      } catch (err) {
        return Reflect.get(target, property, receiver);
      }
    },
    set(target, property, value, receiver) {
      const result = Reflect.set(target, property, value, receiver);
      callback();
      return result;
    }
  };
  return new Proxy(obj, handler);
}

const state = new ReactiveVar({ count: 0 });

const unsubscribe = state.subscribe((newVal) => {
  print(`State changed to: ${JSON.stringify(newVal)}`);
});

const observedState = observe(state.value, () => {
  state.value = observedState;
});

const incrementCounter = () => {
  observedState.count += 1;
};

incrementCounter();
incrementCounter();

unsubscribe();

incrementCounter();
