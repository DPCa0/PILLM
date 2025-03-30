 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
function* arrayIterator(arr) {
  for (let item of arr) {
    yield item;
  }
}

 
const complexObject = {
  title: 'Complex Object',
  data: {
    array: [1, 2, 3, 4, 5],
    nested: { x: 10, y: 20 }
  },
  printData() {
    const { data: { array, nested: { x, y } } } = this;
    print('Array:', array, 'Coordinates:', x, y);
  }
};

 
(async () => {
  print('Fetching data from a public API:');
  const data = await fetchData('https://api.chucknorris.io/jokes/random');
  print('Random Joke:', data.value);

  print('\nUsing Proxy to log property access:');
  print(proxy.a);
  print(proxy.b);
  
  print('\nUsing generator function to iterate array:');
  const iterator = arrayIterator([10, 20, 30]);
  for (const value of iterator) {
    print(value);
  }

  print('\nComplex object with destructuring:');
  complexObject.printData();
})();
