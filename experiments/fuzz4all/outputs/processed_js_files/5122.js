class Observable {
  constructor(value) {
    this._value = value;
    this.subscribers = new Set();
  }

  subscribe(observer) {
    this.subscribers.add(observer);
    observer(this._value);
  }

  notify(value) {
    this.subscribers.forEach((subscriber) => subscriber(value));
  }

  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.notify(newValue);
    }
  }

  get value() {
    return this._value;
  }
}

const proxyHandler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    console.warn(`Property ${prop} does not exist on target`);
    return undefined;
  },
};

const createReactiveObject = (obj) => {
  const observableMap = new Map();

  const handler = {
    get(target, prop) {
      if (!observableMap.has(prop)) {
        observableMap.set(prop, new Observable(target[prop]));
      }
      return observableMap.get(prop).value;
    },
    set(target, prop, value) {
      if (!observableMap.has(prop)) {
        observableMap.set(prop, new Observable(value));
      }
      observableMap.get(prop).value = value;
      return Reflect.set(target, prop, value);
    },
  };

  return new Proxy(obj, handler);
};

const person = createReactiveObject({ name: 'Alice', age: 30 });

const printName = (name) => print(`Name: ${name}`);
const printAge = (age) => print(`Age: ${age}`);

person.name.subscribe(printName);
person.age.subscribe(printAge);

person.name = 'Bob';
person.age = 31;

const proxiedPerson = new Proxy(person, proxyHandler);
print(proxiedPerson.nonExistentProperty);  
