 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const targetObject = {
  message: 'Hello, Proxy!',
  num: 42
};

const handler = {
  get: (target, prop) => {
    print(`Property '${prop}' has been accessed`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Property '${prop}' set to '${value}'`);
    target[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

 
const { message, num } = proxy;
print(`Message: ${message}, Number: ${num}`);

 
const user = { name: 'Alice', age: 30 };
const updatedUser = { ...user, age: 31 };

const numbers = [1, 2, 3, 4, 5];
const [first, ...rest] = numbers;

 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

const gen = numberGenerator();

 
const closureExample = (() => {
  let privateCounter = 0;
  return {
    increment: () => ++privateCounter,
    get value() { return privateCounter; }
  };
})();

(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);

  proxy.message = 'Hello, World!';  
  print(closureExample.increment());  

  print('Generated Numbers:', gen.next().value, gen.next().value, gen.next().value);
  print('Updated User:', updatedUser);
  print('First Number:', first, 'Rest:', rest);
})();
