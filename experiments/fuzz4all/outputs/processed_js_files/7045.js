class AsyncLazy {
  constructor(executor) {
    this.executor = executor;
    this._promise = null;
  }
  
  get promise() {
    if (!this._promise) {
      this._promise = this.executor();
    }
    return this._promise;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

const fibSequence = fibonacci();
const lazyFibs = Array.from({length: 10}, () => new AsyncLazy(async () => {
  await delay(100);
  return fibSequence.next().value;
}));

(async () => {
  for (const lazyFib of lazyFibs) {
    print(await lazyFib.promise);
  }
})();

const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const logMouseMove = debounce((x, y) => {
  print(`Mouse moved to (${x}, ${y})`);
}, 200);

document.addEventListener('mousemove', (event) => {
  logMouseMove(event.clientX, event.clientY);
});

const person = {
  name: 'Alice',
  age: 30
};

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}": ${target[prop]}`);
      return target[prop];
    } else {
      console.error(`Property "${prop}" does not exist.`);
    }
  },
  set: (target, prop, value) => {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    print(`Setting property "${prop}" to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxiedPerson = new Proxy(person, handler);

proxiedPerson.name;
proxiedPerson.age = 31;
proxiedPerson.age = 'old';  
