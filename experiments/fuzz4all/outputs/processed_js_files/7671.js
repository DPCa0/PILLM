class Shape {
  constructor(name) {
    this.name = name;
  }

  describe() {
    print(`This is a ${this.name}`);
  }
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const factorial = memoize(n => (n <= 1 ? 1 : n * factorial(n - 1)));

const shapes = new Proxy([], {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return new Shape(property);
  },
  set(target, property, value) {
    if (value instanceof Shape) {
      target[property] = value;
      return true;
    }
    throw new Error('Only Shape instances are allowed');
  }
});

shapes.circle = new Shape('Circle');
shapes.square = new Shape('Square');

function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const numbers = numberGenerator();

(async () => {
  print(`Factorial of 5 is: ${factorial(5)}`);
  print(`Factorial of 6 is: ${factorial(6)}`);
  
  shapes.circle.describe();
  shapes.square.describe();
  
  print(`Next number: ${numbers.next().value}`);
  print(`Next number: ${numbers.next().value}`);

  const fetchData = url => new Promise(resolve => {
    setTimeout(() => resolve(`Fetched data from ${url}`), 1000);
  });

  const data = await Promise.all([
    fetchData('https://api.example.com/data1'),
    fetchData('https://api.example.com/data2')
  ]);

  print(data);
})();
