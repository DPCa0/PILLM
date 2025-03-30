class Observable {
  constructor(value) {
    this.subscribers = new Set();
    this._value = value;
  }
  
  get value() {
    return this._value;
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.notify();
    }
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
  }

  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }

  notify() {
    this.subscribers.forEach(fn => fn(this._value));
  }
}

 
const createReactiveObject = obj => {
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      } else {
        throw new Error(`Property "${prop}" does not exist.`);
      }
    },
    set(target, prop, value, receiver) {
      if (prop in target) {
        target[prop] = value;
        target[`_${prop}Observable`].value = value;
        return true;
      } else {
        throw new Error(`Cannot set unknown property "${prop}".`);
      }
    }
  };

  const newObj = {};
  for (let key of Object.keys(obj)) {
    newObj[key] = obj[key];
    newObj[`_${key}Observable`] = new Observable(obj[key]);
  }

  return new Proxy(newObj, handler);
};

 
async function fetchAndWatchData(url, obj) {
  const response = await fetch(url);
  const data = await response.json();

  for (let key of Object.keys(data)) {
    if (key in obj) {
      obj[key] = data[key];
    }
  }
  
  print('Initial data set:', obj);
  
  Object.keys(obj).forEach(key => {
    obj[`_${key}Observable`].subscribe(newValue => {
      print(`Property "${key}" changed to:`, newValue);
    });
  });
}

const reactiveObject = createReactiveObject({ name: 'Initial', count: 0 });

fetchAndWatchData('https://api.mocki.io/v1/b043df5a', reactiveObject);

setTimeout(() => {
  reactiveObject.name = 'Updated Name';
  reactiveObject.count = 10;
}, 2000);
