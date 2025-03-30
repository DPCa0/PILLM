 
const range = function*(start, end, step = 1) {
  let current = start;
  while (current <= end) {
    yield current;
    current += step;
  }
};

 
const loggedObject = new Proxy({
  data: [1, 2, 3, 4, 5],
  name: 'Sample Object'
}, {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

 
async function fetchData(url) {
  print(`Fetching data from ${url}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    print('Data fetched successfully:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `<span>${values[i]}</span>` : '';
    return result + string + value;
  }, '');
}

const name = 'World';
const greeting = highlight`Hello, ${name}! Welcome to the advanced JavaScript demo.`;

 
const map = new Map();
map.set('a', 1);
map.set('b', 2);

const set = new Set([1, 2, 3, 4, 5]);

for (const [key, value] of map) {
  print(`Map entry: ${key} = ${value}`);
}

for (const value of set) {
  print(`Set value: ${value}`);
}

 
print(greeting);
print(loggedObject.name);
loggedObject.name = 'Updated Object';

 
print([...range(1, 10, 2)]);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
