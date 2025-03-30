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

function createObservable(target) {
  return new Proxy(target, {
    set(obj, prop, value) {
      obj[prop] = value;
      if (prop in obj._observers) {
        obj._observers[prop].notify(value);
      }
      return true;
    }
  });
}

const person = createObservable({
  name: 'Alice',
  age: 30,
  _observers: {
    name: new Observable(),
    age: new Observable(),
  }
});

person._observers.name.subscribe(name => print(`Name changed to: ${name}`));
person._observers.age.subscribe(age => print(`Age changed to: ${age}`));

person.name = 'Bob';
person.age = 31;

 
async function* numberGenerator() {
  let number = 1;
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield number++;
  }
}

(async function() {
  const gen = numberGenerator();
  for await (const num of gen) {
    print(`Generated number: ${num}`);
    if (num >= 5) break;
  }
})();

 
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

const print = debounce((message) => print(message), 1000);

print('Hello,');
print('Hello, world!');
