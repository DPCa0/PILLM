 

 
const handler = {
  get: function(target, property, receiver) {
    print(`Getting property '${property}'`);
    return Reflect.get(...arguments);
  },
  set: function(target, property, value, receiver) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(...arguments);
  }
};

const targetObject = { name: 'Alice', age: 30 };
const proxy = new Proxy(targetObject, handler);

 
proxy.name;         
proxy.age = 31;     

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fibSeq = fibonacci(100);
print([...fibSeq]);  

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncSequence() {
  print('Start');
  await delay(1000);   
  print('1 second passed');
  await delay(2000);   
  print('3 seconds in total passed');
}

asyncSequence();

 
const uniqueValues = new Set([1, 2, 3, 4, 4, 5]);
uniqueValues.add(6);
uniqueValues.delete(1);
print(Array.from(uniqueValues));  

const keyValueStore = new Map();
keyValueStore.set('name', 'Bob');
keyValueStore.set('age', 25);

for (const [key, value] of keyValueStore) {
  print(`${key}: ${value}`);
}

 
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }

  static info() {
    print('Animals are multicellular eukaryotic organisms.');
  }
}

class Dog extends Animal {
  speak() {