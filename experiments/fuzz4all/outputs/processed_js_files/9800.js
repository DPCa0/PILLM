const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* createIterator(arr) {
  for (const x of arr) {
    if (Array.isArray(x)) {
      yield* createIterator(x);
    } else {
      yield x;
    }
  }
}

 
const fetchData = async (url, signal) => {
  try {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property '${property}'`);
    return Reflect.get(target, property, receiver);
  }
};

const mySymbol = Symbol('mySymbol');

let obj = {
  [mySymbol]: 'hidden',
  visible: 'seen'
};

const proxyObj = new Proxy(obj, handler);

 
const main = async () => {
  print('Data fetch simulation begins...');

  const controller = new AbortController();
  const signal = controller.signal;

  const timer = delay(3000).then(() => controller.abort());

  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1', signal);
  print('Fetched Data:', data);

  print('Iterating through nested arrays...');
  const iter = createIterator([1, [2, 3], [4, [5, 6]], 7]);
  for (const value of iter) {
    print(value);
  }

  print('Proxy object access demonstration...');
  print(proxyObj.visible);
  print(proxyObj[mySymbol]);
};

main();
