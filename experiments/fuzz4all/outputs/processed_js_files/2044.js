 
const ID = Symbol('id');

 
const handler = {
  set(target, prop, value) {
    if (prop === 'age' && (value < 0 || value > 120)) {
      console.error('Invalid age');
      return false;
    }
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
  get(target, prop) {
    print(`Getting ${prop}`);
    return target[prop];
  }
};

 
const person = new Proxy({
  [ID]: '1234',
  name: 'John Doe',
  age: 30
}, handler);

 
Reflect.set(person, 'age', 25);  
print(Reflect.get(person, 'name'));  

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
print(first, second, rest);  

 
const uniqueValues = new Set([1, 2, 3, 3, 4]);
const squaredValues = [...uniqueValues].map(x => x * x);
print(squaredValues);  

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');
