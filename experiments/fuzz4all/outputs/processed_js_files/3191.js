 

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get(target, property) {
    print(`Getting property: ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set(target, property, value) {
    if (typeof value === 'number') {
      print(`Setting property: ${property} to ${value}`);
      target[property] = value;
      return true;
    } else {
      console.error('Invalid value, must be a number');
      return false;
    }
  }
};

let obj = new Proxy({}, handler);

 
obj.age = 25;
print(obj.age);
obj.name = 'John';  

 
const uniqueID = Symbol('id');
obj[uniqueID] = 12345;
print('Unique ID:', obj[uniqueID]);

 
let uniqueValues = new Set([1, 2, 3, 4, 5, 5, 2]);
print('Unique values:', [...uniqueValues]);

 
let userMap = new Map();
userMap.set('name', 'Alice');
userMap.set('age', 30);
userMap.set(true, 'Boolean Key');
print('User map entries:', [...userMap]);

 
function displayInfo({ name, age, ...rest }) {
  print(`Name: ${name}, Age: ${age}`);
  print('Additional Info:', rest);
}

let user = { name: 'Bob', age: 40, city: 'New York', job: 'Engineer' };
displayInfo(user);

 
(async () => {
  let data = await