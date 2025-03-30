 

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    }
    console.warn(`Property ${property} does not exist`);
  },
  set: (target, property, value) => {
    if (typeof value === 'number') {
      print(`Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
    console.error(`Value for ${property} must be a number`);
    return false;
  }
};

const numbers = new Proxy({}, handler);
numbers.x = 10;    
print(numbers.x);   

 
function* fibonacciGenerator(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    [prev, curr] = [curr, prev + curr];
    yield prev;
  }
}

const fibonacci = [...fibonacciGenerator(10)];
print('Fibonacci sequence:', fibonacci);

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  #calculateArea() {
    return this.#width * this.#height;
  }

  logArea() {
    print(`Rectangle Area: ${this.#calculateArea()}`);
  }
}

const rect = new Rectangle(5, 10);
rect.logArea();  
