 
function* fibonacci(n, current = 0, next = 1) {
  if (n === 0) return;
  yield current;
  yield* fibonacci(n - 1, next, current + next);
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing element at index ${prop}:`, target[prop]);
    } else {
      print(`No element at index ${prop}`);
    }
    return target[prop];
  }
};

const fibonacciSequence = [...fibonacci(10)];
const proxiedArray = new Proxy(fibonacciSequence, handler);

 
(async function logFibonacciAsync() {
  for (const num of proxiedArray) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    print(`Logged Fibonacci number: ${num}`);
  }
})();

 
class Circle {
  #radius;

  constructor(radius) {
    this.#radius = radius;
  }

   
  get area() {
    return this.#calculateArea();
  }

  #calculateArea() {
    return Math.PI * this.#radius ** 2;
  }
}

const myCircle = new Circle(3);
print('Circle Area:', myCircle.area);

 
const nestedObject = { a: 1, b: { c: 2, d: { e: 3 } } };
const { a, b: { c, d: { e } } } = nestedObject;
print(`Destructured Values: a=${a}, c=${c}, e=${e}`);

 
const user = { name: 'Alice', preferences: null };
print('User Language:', user.preferences?.language ?? 'en');
