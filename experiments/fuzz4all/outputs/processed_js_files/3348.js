class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

const emitter = new EventEmitter();

 
const handler = {
  get(target, propKey) {
    const origMethod = target[propKey];
    return function (...args) {
      print(`${propKey} was called with ${JSON.stringify(args)}`);
      return origMethod.apply(this, args);
    };
  }
};

const proxiedEmitter = new Proxy(emitter, handler);

 
function* generateNumbers(max) {
  let num = 1;
  while (num <= max) {
    yield num++;
  }
}

const unsubscribe = proxiedEmitter.on('number', (num) => {
  print(`Received number: ${num}`);
});

for (let number of generateNumbers(5)) {
  proxiedEmitter.emit('number', number);
  if (number === 3) unsubscribe();   
}

 
const arr = [1, 2, 3, 4, 5];
const [first, second, ...rest] = arr;
const merged = [...rest, first + second];

print(`First two: ${first}, ${second}`);
print(`Rest merged with sum of first two: ${merged}`);
