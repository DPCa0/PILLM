 

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const obj = new Proxy({}, handler);
obj.message = "Hello, world!";
print(obj.message);

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data =>
  console.log(data)
);

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
const uniqueValues = new Set([1, 2, 2, 3, 4]);
uniqueValues.add(5);
print([...uniqueValues]);

const map = new Map();
map.set('name', 'Alice');
map.set('age', 25);

map.forEach((value, key) => {
  print(`${key}: ${value}`);
});

 
const person = { name: 'Bob', age: 30, city: 'New York' };
const { name, ...rest } = person;
print(name);  
print(rest);  

const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5, 6];
print(moreNumbers);
