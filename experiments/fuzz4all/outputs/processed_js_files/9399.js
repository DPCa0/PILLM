class Observer {
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

class ObservableArray extends Array {
  constructor(...args) {
    super(...args);
    this.observer = new Observer();
  }

  push(...items) {
    super.push(...items);
    this.observer.notify(this);
    return this.length;
  }

  pop() {
    const item = super.pop();
    this.observer.notify(this);
    return item;
  }

   
}

const advancedProxyHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property ${prop} does not exist on the target object`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting value ${value} to property ${prop}`);
    target[prop] = value;
    return true;
  }
};

function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const proxyTarget = { a: 1, b: 2 };
const proxy = new Proxy(proxyTarget, advancedProxyHandler);

const array = new ObservableArray(1, 2, 3);
array.observer.subscribe((arr) => print(`Array updated: [${arr.join(', ')}]`));

array.push(4);
array.pop();

const fibGenerator = fibonacci();
print(fibGenerator.next().value);
print(fibGenerator.next().value);
print(fibGenerator.next().value);

print(proxy.a);
print(proxy.c);

proxy.b = 42;
