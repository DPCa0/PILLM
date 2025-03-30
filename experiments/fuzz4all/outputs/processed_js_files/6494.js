 
function bold(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}<strong>${values[i - 1]}</strong>${str}`);
}

 
const handler = {
  get: (obj, prop) => {
    print(`Property "${prop}" was accessed.`);
    return Reflect.get(obj, prop);
  }
};

const target = { name: "Alice", age: 30 };
const proxy = new Proxy(target, handler);

 
async function fetchData() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];

  try {
    const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json())));
    return responses;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function countOccurrences(arr) {
  return arr.reduce((map, item) => map.set(item, (map.get(item) || 0) + 1), new Map());
}

 
(async function execute() {
  print(bold`Hello, ${proxy.name}! You are ${proxy.age} years old.`);

  const data = await fetchData();
  print('Fetched Data:', data);

  const array = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
  const occurrenceMap = countOccurrences(array);
  print('Occurrences:', occurrenceMap);
})();
