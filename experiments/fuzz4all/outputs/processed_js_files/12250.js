 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} does not exist`;
    }
  }
};

let user = { name: 'Alice', age: 25 };
let proxyUser = new Proxy(user, handler);

 
function* numberGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
(async () => {
  try {
    const { random } = await import('lodash-es');
    print('Random number:', random(0, 100));
  } catch (error) {
    console.error('Error importing module:', error);
  }
})();

 
const promise1 = fetchData('https://jsonplaceholder.typicode.com/posts/1');
const promise2 = fetchData('https://jsonplaceholder.typicode.com/posts/2');

Promise.all([promise1, promise2]).then(([data1, data2]) => {
  print('Data 1:', data1);
  print('Data 2:', data2);
});

 
let map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

let set = new Set([1, 2, 3, 4, 5]);

map.forEach((value, key) => {
  print(`${key}: ${value}`);
});

set.forEach(value => {
  print(`Set value: ${value}`);
});

 
let greeting = `Hello, ${proxyUser.name}`;
print(greeting);

 
print(proxyUser.address);  
