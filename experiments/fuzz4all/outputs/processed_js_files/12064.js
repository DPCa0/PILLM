 
'use strict';

 
const sumAll = (...args) => args.reduce((acc, val) => acc + val, 0);

 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const _radius = Symbol('radius');
const _computeArea = Symbol('computeArea');

class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }

  [_computeArea]() {
    return Math.PI * this[_radius] ** 2;
  }

  get area() {
    return this[_computeArea]();
  }
}

 
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

const set = new Set(['apple', 'banana', 'mango']);

 
for (const [key, value] of map) {
  print(`Key: ${key}, Value: ${value}`);
}

 
for (const item of set) {
  print(`Set item: ${item}`);
}

 
function* fibonacci(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
const fibGen = fibonacci(5);
for (let num of fibGen) {
  print(num);
}

 
(async () => {
  await fetchData('https://jsonplaceholder.typicode.com/todos/1');
})();

 
const myCircle = new Circle(5);
print('Circle area:', myCircle.area);
