 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const mapAndSetExample = () => {
  const map = new Map();
  const set = new Set([1, 2, 3, 4, 5]);

  map.set('key1', 'value1');
  map.set('key2', set);

  for (const [key, value] of map) {
    print(`Map key: ${key}, value: ${[...value]}`);
  }

  const [first, ...rest] = set;
  print(`First in set: ${first}, Rest: ${rest}`);
};

 
const targetObject = { message: 'Hello Proxy!' };
const handler = {
  get: (target, property) => {
    if (property === 'message') {
      return `Intercepted: ${target[property]}`;
    }
    return target[property];
  },
};

const proxy = new Proxy(targetObject, handler);

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const data = await fetchData(url);
  print('Fetched data:', data);

  const generator = numberGenerator();
  print('First generated number:', generator.next().value);
  print('Second generated number:', generator.next().value);

  mapAndSetExample();
  print(proxy.message);
})();
