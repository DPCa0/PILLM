 
const sumAll = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);

 
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

 
const user = {
  name: 'John',
  age: 30,
};

const userProxy = new Proxy(user, {
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[key] = value;
    return true;
  },
});

 
const uniqueId = Symbol('id');

function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const idGen = idGenerator();

 
const [x, y, z] = [1, 2, 3];
print(`Coordinates are x: ${x}, y: ${y}, z: ${z}`);

 
const numMap = new Map([
  ['one', 1],
  ['two', 2],
]);

const uniqueSet = new Set([1, 2, 3, 3, 4]);

const weakMap = new WeakMap();
const objKey = {};
weakMap.set(objKey, 'secret');

 
(async () => {
  print(sumAll(1, 2, 3, 4));  

  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print(data);

  try {
    userProxy.age = 'thirty';  
  } catch (e) {
    console.error(e.message);
  }

  print(uniqueId.description);  
  print(idGen.next().value);  

  print(numMap.get('one'));  
  print(uniqueSet.has(2));  
  console.log(weakMap.get(obj