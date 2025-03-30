 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
function processData({ name, age, ...rest }, ...other) {
  print(`Name: ${name}, Age: ${age}`);
  print('Other details:', rest);
  print('Additional parameters:', other);
}

 
class User {
  #id;
  #privateMethod() {
    return `User ID is: ${this.#id}`;
  }

  constructor(id, name) {
    this.#id = id;
    this.name = name;
  }

  get userInfo() {
    return this.#privateMethod();
  }

  set userId(newId) {
    if (typeof newId === 'number') this.#id = newId;
  }
}

 
const handler = {
  get: (target, property) => {
    return property in target ? target[property] : 'Property does not exist';
  },
};

const user = new Proxy(new User(1, 'John Doe'), handler);

 
const uniqueNames = new Set(['Alice', 'Bob', 'Alice', 'Cathy']);
const nameLengthMap = new Map();

for (const name of uniqueNames) {
  nameLengthMap.set(name, name.length);
}

(async () => {
   
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    processData(data, 'Extra', 'Parameters');
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  print(user.userInfo);
  print(user.name);

   
  for (const [name, length] of nameLengthMap) {
    print(`${name}: ${length} characters`);
  }
})();
