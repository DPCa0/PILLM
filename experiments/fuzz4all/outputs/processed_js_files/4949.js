 
'use strict';

 
const accessLogger = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value);
  }
};

 
const user = {
  name: 'Alice',
  age: 30,
  location: 'Wonderland'
};

 
const proxiedUser = new Proxy(user, accessLogger);

 
const { name: username, age = 18, occupation = 'Unknown' } = proxiedUser;

 
print(`User Info: Name - ${username}, Age - ${age}, Occupation - ${occupation}`);

 
const userMap = new Map();
userMap.set('username', username);
userMap.set('age', age);

 
for (const [key, value] of userMap) {
  print(`${key}: ${value}`);
}

 
async function fetchUserData() {
  const simulateNetworkCall = () => new Promise(resolve => setTimeout(() => resolve('Fetched Data'), 1000));
  try {
    const data = await simulateNetworkCall();
    print(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchUserData();

 
const uniqueProperty = Symbol('uniqueProperty');
proxiedUser[uniqueProperty] = 'Unique Value';
print(`Unique Property: ${proxiedUser[uniqueProperty]}`);

 
function* userNameGenerator() {
  yield 'Alice';
  yield 'Bob';
  yield 'Charlie';
}

const namesIterator = userNameGenerator();
print('Generated names:', [...namesIterator]);
