 
class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
  }

  *[Symbol.iterator]() {
    let a = 0, b = 1, count = 0;
    while (count < this.limit) {
      yield a;
      [a, b] = [b, a + b];
      count++;
    }
  }
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
function tag(strings, ...values) {
  return strings.raw.reduce((prev, curr, i) => prev + curr + (values[i] || ''), '');
}

const name = "advanced JavaScript";
print(tag`Learning ${name} features!`);

 
(() => {
  const point = { x: 10, y: 20 };
  const { x, y } = point;
  print(`Point coordinates are (${x}, ${y})`);
})();

 
const validator = {
  set: function(obj, prop, value) {
    if (prop === 'age' && (value < 0 || value > 150)) {
      throw new RangeError('Age must be a valid number between 0 and 150');
    }
    obj[prop] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 25;  
try {
  person.age = -5;  
} catch (e) {
  console.error(e.message);
}

 
const counter = (() => {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
})();

print(`Counter initial value: ${counter.value()}`);
print(`Counter incremented: ${counter.increment()}`);
print(`Counter decremented: ${counter.decrement()}`);

 