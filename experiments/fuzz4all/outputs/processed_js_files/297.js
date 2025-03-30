 
const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      print(`GET: ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      throw new ReferenceError(`Property ${prop} does not exist.`);
    }
  },
  set: function(target, prop, value) {
    print(`SET: ${prop} = ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const obj = new Proxy({a: 1, b: 2}, handler);
obj.a;  
obj.b = 3;  

 
function* fibonacci(limit) {
  let [prev, current] = [0, 1];
  while (limit--) {
    yield current;
    [prev, current] = [current, prev + current];
  }
}

const fib = fibonacci(5);
print([...fib]);  

 
async function fetchData(urls) {
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  try {
    const results = await Promise.all(fetchPromises);
    print(results);
  } catch (error) {
    console.error('Fetching error:', error);
  }
}

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
fetchData(urls);

 
const privateData = new WeakMap();
class MyClass {
  constructor(value) {
    privateData.set(this, { hiddenValue: value });
  }
  get value() {
    return privateData.get(this).hiddenValue;
  }
}

const instance = new MyClass(42);
print(instance.value);  
