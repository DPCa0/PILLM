 
class Person {
  #name;
  
  constructor(name) {
    this.#name = name;
  }

   
  getName() {
    return this.#name;
  }

   
  static greet() {
    return 'Hello!';
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessed property: ${prop}`);
    return target[prop];
  },
};

const person = new Person('Alice');
const proxiedPerson = new Proxy(person, handler);

print(proxiedPerson.getName());  
print(Person.greet());  

 
async function fetchData() {
  const promise = new Promise((resolve) =>
    setTimeout(() => resolve('Data fetched'), 2000)
  );
  const result = await promise;
  print(result);
}

fetchData();

 
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generateSequence();

for (const value of generator) {
  print(value);  
}

 
const mySet = new Set([1, 2, 3, 4, 4, 4]);
mySet.add(5);
mySet.forEach(value => print(value));  

const myMap = new Map();
myMap.set('key1', 'value1');
myMap.set('key2', 'value2');
myMap.forEach((value, key) => print(`${key}: ${value}`));  
