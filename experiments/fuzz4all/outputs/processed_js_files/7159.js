 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property: ${prop}`);
      return target[prop];
    } else {
      print(`Property ${prop} does not exist, returning default.`);
      return 'default';
    }
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dynamicObject = new Proxy({ a: 1, b: 2 }, handler);
dynamicObject.a;  
dynamicObject.c;  
dynamicObject.d = 4;  

 
const mySet = new Set([1, 2, 3, 4, 4]);
mySet.add(5);
print('Set values:', [...mySet]);  

const myMap = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);

for (const [key, value] of myMap.entries()) {
  print(`Map entry: ${key} => ${value}`);
}

 
const uniqueKey = Symbol('unique');
const myObj = {
  [uniqueKey]: 'uniqueValue',
  normalKey: 'normalValue'
};

print('Symbol-based property:', myObj[uniqueKey]);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
