class Observable {
  constructor() {
    this.subscribers = new Set();
  }
  
  subscribe(subscriber) {
    this.subscribers.add(subscriber);
  }
  
  unsubscribe(subscriber) {
    this.subscribers.delete(subscriber);
  }
  
  notify(data) {
    this.subscribers.forEach(sub => sub(data));
  }
}

function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

const createMatrix = (rows, cols) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => Math.random()));

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const asyncFunction = async () => {
  return new Promise(resolve => setTimeout(() => resolve("Async Result"), 1000));
};

(async () => {
  const observable = new Observable();
  const matrix = createMatrix(3, 3);
  const sequence = generateSequence(1, 5);
  
  observable.subscribe(console.log);
  observable.notify("Hello Observers!");
  
  const handleResize = debounce(() => {
    print('Window resized');
  }, 200);

  window.addEventListener('resize', handleResize);

  print([...sequence]);
  
  const result = await asyncFunction();
  print(result);
  
  console.table(matrix);
})();
