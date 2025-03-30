 

 
const handler = {
  get(target, property, receiver) {
    print(`Getting property '${property}'`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value, receiver);
  }
};

const target = { name: 'Alice', age: 25 };
const proxy = new Proxy(target, handler);

proxy.name;  
proxy.age = 30;  

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched data:', data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const generator = generateSequence(1, 5);
for (let value of generator) {
  print('Generated value:', value);
}

 
const set = new Set([1, 2, 3, 4, 5]);
print('Set size:', set.size);

const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
map.forEach((value, key) => {
  print(`Map key: ${key}, value: ${value}`);
});

 
class Animal {
  static planet = 'Earth';
  
  constructor(name) {
    this.name = name;
  }

  static description() {
    return `Animals live on planet ${this.planet}`;
  }
}

const dog = new Animal('Dog');
print(Animal.description());
print('Animal name:', dog.name);
