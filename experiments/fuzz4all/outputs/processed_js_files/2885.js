 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    print('Data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const target = {
  message: 'Hello, world!'
};

const handler = {
  get: function(obj, prop) {
    if (prop in obj) {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    } else {
      return `Property ${prop} not found.`;
    }
  },
  set: function(obj, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
print(proxy.message);  
proxy.message = 'Hello, universe!';  
print(proxy.message);

 
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 5, 5]);

print('Unique Numbers:', [...uniqueNumbers]);

 
function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const gen = numberGenerator();

print(gen.next().value);  
print(gen.next().value);  
print(gen.next().value);  

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
