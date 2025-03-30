 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} not found!`);
      return undefined;
    }
  }
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield `id-${id++}`;
  }
}

const idGen = idGenerator();

 
const privateData = new WeakMap();

class User {
  constructor(name, age) {
    privateData.set(this, { name, age });
  }
  
  #getName() {
    return privateData.get(this).name;
  }
  
  getDetails() {
    return `User: ${this.#getName()}, Age: ${privateData.get(this).age}`;
  }
}

 
const uniqueValues = new Set([1, 2, 3, 4, 4, 5]);
const userMap = new Map();
userMap.set('123', new User('Alice', 30));

 
const dynamicObject = new Proxy({}, handler);

 
(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched Data:', data);
    
    dynamicObject.title = data.title;  
    print('Dynamic Property:', dynamicObject.title);
    
    print(`Generated ID: ${idGen.next().value}`);  
    
    print('Unique Values:', Array.from(uniqueValues));
    print('User Details:', userMap.get('123').getDetails());
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
