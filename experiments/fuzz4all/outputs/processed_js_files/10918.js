class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    print(`${this.name} barks.`);
  }
}

const handler = {
  get: function(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    } else {
      print(`Property ${prop} doesn't exist.`);
      return undefined;
    }
  },
  set: function(obj, prop, value) {
    if (prop === 'name' && typeof value !== 'string') {
      print(`Name must be a string.`);
    } else {
      obj[prop] = value;
      print(`Set ${prop} to ${value}.`);
    }
  }
};

const withLogging = (fn) => (...args) => {
  print(`Calling ${fn.name} with ${args}`);
  return fn(...args);
};

const sum = withLogging((a, b) => a + b);

const dog = new Proxy(new Dog('Rex'), handler);

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

(async function() {
  dog.speak();
  dog.color = 'brown';
  print(`Sum: ${sum(5, 3)}`);
  print(`ID: ${gen.next().value}`);
  
  const promise = new Promise((resolve) => setTimeout(() => resolve('Done!'), 2000));
  const result = await promise;
  print(result);
})();
