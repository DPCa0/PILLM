 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const targetObject = {
  message: 'Hello, World!',
};

const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'.`);
    return Reflect.set(...arguments);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
(async () => {
  print(proxyObject.message);   

  proxyObject.message = 'Hello, JavaScript!';   

  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);
})();

 
function* numberGenerator() {
  let num = 0;
  while (num < 5) {
    yield num++;
  }
}

const gen = numberGenerator();
for (const value of gen) {
  print(`Generated number: ${value}`);
}

 
const UNIQUE_KEY = Symbol('uniqueKey');
const symbolObject = {
  [UNIQUE_KEY]: 'Symbol Value'
};

print(`Symbol Property: ${symbolObject[UNIQUE_KEY]}`);

 
const { x = 10, y = 20 } = { x: 5 };
print(`x: ${x}, y: ${y}`);

 
const numbers = [1, 2, 3, 4, 5];
const evenSquares = numbers
  .map(num => num * num)
  .filter(square => square % 2 === 0);
print('Even Squares:', evenSquares);
