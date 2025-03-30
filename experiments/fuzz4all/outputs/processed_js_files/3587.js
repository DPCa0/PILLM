class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const asyncOperation = (data, delay) => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

const debounce = (func, wait) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const mergeSortedArrays = (arr1, arr2) => {
  const result = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
};

 
(async () => {
  const emitter = new EventEmitter();
  
  emitter.on('greet', name => print(`Hello, ${name}!`));
  emitter.on('greet', name => print(`Welcome, ${name}!`));
  
  emitter.emit('greet', 'Alice');
  
  print('Merging arrays: ', mergeSortedArrays([1, 3, 5], [2, 4, 6]));

  print('Starting async operation');
  const result = await asyncOperation('Data loaded', 1000);
  print(result);
})();

const processInput = debounce((input) => {
  print('Processing input:', input);
}, 300);

['hello', 'world', 'debounce', 'test'].forEach((word, index) => {
  setTimeout(() => processInput(word), index * 200);
});
