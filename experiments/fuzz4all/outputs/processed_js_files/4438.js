class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(fn) {
    this.subscribers.add(fn);
  }
  unsubscribe(fn) {
    this.subscribers.delete(fn);
  }
  notify(data) {
    this.subscribers.forEach(fn => fn(data));
  }
}

const observeArray = arr => {
  const observable = new Observable();
  const handler = {
    get(target, property, receiver) {
      if (property === 'push') {
        return function(...items) {
          const result = Reflect.apply(target[property], target, items);
          observable.notify({ type: 'push', items, result });
          return result;
        }
      }
      return Reflect.get(target, property, receiver);
    }
  };
  return new Proxy(arr, handler);
};

const logChange = ({ type, items }) => {
  print(`Array changed: ${type} with items ${items}`);
};

const arr = observeArray([]);
const subscription = logChange;
arr.subscribe(subscription);
arr.push(1, 2, 3);
arr.push(4);

arr.unsubscribe(subscription);
arr.push(5);
