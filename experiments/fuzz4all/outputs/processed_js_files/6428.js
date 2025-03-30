 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
};

 
const target = {};
const handler = {
  get: (obj, prop) => {
    print(`Getting property ${prop}`);
    return prop in obj ? obj[prop] : 37;
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  },
};
const proxy = new Proxy(target, handler);

 
function* fibonacci() {
  let [prev, current] = [0, 1];
  while (true) {
    [prev, current] = [current, prev + current];
    yield current;
  }
}

 
const numbers = [1, 2, 3, 4, 5];
const sumOfSquares = numbers
  .map(n => n ** 2)
  .filter(n => n % 2 === 0)
  .reduce((acc, curr) => acc + curr, 0);

 
const iterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);

  proxy.name = 'JavaScript';
  print('Proxy name:', proxy.name);

  const fibGen = fibonacci();
  print('Fibonacci:', fibGen.next().value, fibGen.next().value, fibGen.next().value);

  print('Sum of squares of even numbers:', sumOfSquares);

  for (let value of iterable) {
    print('Iterated value:', value);
  }
})();
