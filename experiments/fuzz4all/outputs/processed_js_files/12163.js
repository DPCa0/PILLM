class ReactiveVariable {
  constructor(initialValue) {
    this.value = initialValue;
    this.subscribers = new Set();
  }
  
  set(newValue) {
    this.value = newValue;
    this.notify();
  }
  
  get() {
    return this.value;
  }
  
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  
  notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }
}

function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

const asyncOperation = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(Math.random().toFixed(2)), Math.random() * 1000);
  });
};

async function* createAsyncGenerator() {
  while (true) {
    yield await asyncOperation();
  }
}

const reactiveVar = new ReactiveVariable(0);
const unsubscribe = reactiveVar.subscribe(debounce((value) => {
  print('New Value:', value);
}, 300));

(async () => {
  const asyncGen = createAsyncGenerator();
  
  for await (const value of asyncGen) {
    reactiveVar.set(value);
  }
})();

setTimeout(() => {
  unsubscribe();
  print("Unsubscribed from updates.");
}, 10000);
