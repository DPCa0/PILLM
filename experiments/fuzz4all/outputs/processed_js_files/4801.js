class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  subscribe(observer) {
    this.subscribers.add(observer);
  }
  unsubscribe(observer) {
    this.subscribers.delete(observer);
  }
  notify(data) {
    this.subscribers.forEach(observer => observer(data));
  }
}

const observable = new Observable();

const observer = (data) => {
  print(`Observer received data: ${data}`);
};

observable.subscribe(observer);

 
const data = { value: 42 };
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    observable.notify(value);
    return Reflect.set(...arguments);
  }
};

const proxyData = new Proxy(data, handler);

proxyData.value;     
proxyData.value = 100;  
proxyData.value;     

 
function* generatorFunction() {
  print('Generator started');
  yield new Promise((resolve) => setTimeout(() => resolve('Hello'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('World'), 1000));
  print('Generator ended');
}

async function runGenerator(genFunc) {
  const generator = genFunc();
  for await (const value of generator) {
    print(value);
  }
}

runGenerator(generatorFunction);

print('Script started');
