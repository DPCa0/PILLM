(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const uniqueValues = new Set([1, 2, 3, 4, 5, 1, 2, 6]);

   
  const map = new Map();
  map.set('key1', 'value1');
  map.set('key2', 'value2');

   
  const target = {};
  const handler = {
    get: function(obj, prop) {
      return prop in obj ? obj[prop] : 'Property does not exist';
    }
  };
  const proxy = new Proxy(target, handler);

   
  const uniqueKey = Symbol('unique');
  target[uniqueKey] = 'secret';

   
  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...rest } = obj;

   
  const message = `Hello, unique values: ${[...uniqueValues].join(', ')}, with keys: ${[...map.keys()].join(', ')}`;

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Fetched Data Title: ${data.title}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  print(message);
  print('Proxy access:', proxy.key1);
  print('Destructured object:', a, rest);
  print('Accessing unique key:', target[uniqueKey]);
})();
