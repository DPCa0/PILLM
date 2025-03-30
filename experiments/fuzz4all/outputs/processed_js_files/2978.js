 
async function fetchData(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    const data = await response.json();

     
    const { title, body } = data;

     
    print(`Title: ${title}\nBody: ${body}`);
  } catch (error) {
     
    console.error(`Fetch error: ${error.message}`);
  }
}

 
const handler = {
  get: (target, property, receiver) => {
    print(`Getting ${property.toString()}`);
    return Reflect.get(target, property, receiver);
  },
  set: (target, property, value, receiver) => {
    print(`Setting ${property.toString()} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

proxy.a;  
proxy.b = 3;  

 
const cache = new Map();
function addToCache(key, value, ttl) {
  const expiryTime = Date.now() + ttl;
  cache.set(key, { value, expiryTime });

  setTimeout(() => cache.delete(key), ttl);
}

 
const sum = (...args) => args.reduce((acc, val) => acc + val, 0);

 
addToCache('exampleKey', 42, 5000);
print(`Sum: ${sum(1, 2, 3, 4)}`);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
