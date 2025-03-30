 
const person = { name: "Alice", age: 25 };
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting ${property}: ${target[property]}`);
      return target[property];
    } else {
      throw new ReferenceError(`Property "${property}" does not exist.`);
    }
  },
  set(target, property, value) {
    if (property === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new TypeError('Age must be a positive number.');
    }
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyPerson = new Proxy(person, handler);

 
function* fibonacciSequence() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
const fibonacci = (function() {
  const generator = fibonacciSequence();
  return function(n) {
    return Array.from({ length: n }, () => generator.next().value);
  };
})();

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

 
(async function() {
   
  print(proxyPerson.name);
  proxyPerson.age = 30;
  try {
    proxyPerson.age = -1;
  } catch (e) {
    console.error(e.message);
  }
  try {
    print(proxyPerson.height);
  } catch (e) {
    console.error(e.message);
  }

   
  print('Fibonacci:', fibonacci(5));

   
  await fetchData('https://jsonplaceholder.typicode.com/posts/1');
})();
