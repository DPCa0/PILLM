 
const uniqueKey = Symbol('unique');

 
const data = new Proxy({
  name: 'Alice',
  age: 30,
  [uniqueKey]: 'secretValue'
}, {
  get(target, prop) {
    if (prop === 'age') {
      print('Accessing age property');
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[prop] = value;
    return true;
  }
});

 
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

 
async function fetchData() {
  const fakeFetch = () => new Promise(resolve => setTimeout(() => resolve('Fetched Data'), 1000));
  const data = await fakeFetch();
  print(data);
}

 
const user = { name: 'Bob', age: 25, country: 'USA' };
const { name, ...rest } = user;
print(name);  
print(rest);  

 
(() => {
  print('IIFE executed');
})();

 
class Person {
  #privateField = 'hidden';

  #privateMethod() {
    return this.#privateField;
  }

  getPrivate() {
    return this.#privateMethod();
  }
}

const person = new Person();
print(person.getPrivate());  

 
fetchData();

 
print(data.name);  
data.age = 31;  
print(data.age);  

 
const iterator = numberGenerator();
for (const value of iterator) {
  print(value);  
}
