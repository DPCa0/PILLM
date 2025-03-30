class Observable {
  constructor(value) {
    this._value = value;
    this._listeners = new Set();
  }

  subscribe(listener) {
    this._listeners.add(listener);
    listener(this._value);
    return () => this._listeners.delete(listener);
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._notify();
    }
  }

  _notify() {
    this._listeners.forEach(listener => listener(this._value));
  }
}

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const state = new Proxy({ count: new Observable(0) }, {
  set(target, prop, value) {
    if (prop in target && target[prop] instanceof Observable) {
      target[prop].value = value;
      return true;
    }
    throw new Error(`Cannot set property ${prop} which is not observable`);
  },
  get(target, prop) {
    if (prop in target && target[prop] instanceof Observable) {
      return target[prop]._value;
    }
    throw new Error(`Cannot get property ${prop} which is not observable`);
  }
});

const logDebounced = debounce(value => {
  print(`The count is: ${value}`);
}, 300);

const unsubscribe = state.count.subscribe(logDebounced);

let incrementCount = setInterval(() => {
  state.count += 1;
  if (state.count > 5) {
    clearInterval(incrementCount);
    unsubscribe();
    print("Stopped observing changes.");
  }
}, 500);
