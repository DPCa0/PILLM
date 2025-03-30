 

 
const handler = {
  get: function(obj, prop) {
    return prop in obj ? obj[prop] : `Property "${prop}" not found`;
  }
};

const target = { name: 'Alice', age: 30 };
const proxy = new Proxy(target, handler);

print(proxy.name);  
print(proxy.location);  

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);
})();

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

print('Map:', map);

const set = new Set([1, 2, 2, 3, 4]);
set.add(5);
print('Set:', set);

 
const person = { firstName: 'John', lastName: 'Doe', age: 25 };
const { firstName, age, ...rest } = person;
print('Destructured:', firstName, age, rest);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2];
print('Combined Array:', combinedArray);

 
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    print(`${this.name} barks.`);
  }
}

const dog = new Dog('Fido', 'Labrador');
dog.speak();  
