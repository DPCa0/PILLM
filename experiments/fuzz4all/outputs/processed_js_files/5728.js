 

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const handler = {
  set(target, property, value) {
    if (property === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new TypeError('Age must be a positive number');
    }
    target[property] = value;
    return true;
  }
};

let user = new Proxy({}, handler);

 
const uniqueSet = new Set();
const dataMap = new Map();

uniqueSet.add(1);
uniqueSet.add(1);  
uniqueSet.add(2);

dataMap.set('name', 'John Doe');
dataMap.set('age', 30);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

 
function logUserInfo({ name, age, hobbies = [] }) {
  const hobbiesList = [...hobbies, 'default hobby'];
  print(`Name: ${name}, Age: ${age}, Hobbies: ${hobbiesList.join(', ')}`);
}

 
(async () => {
  print('Fetching data...');
  const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
  
  print('Fetched Data:', data);
  
  try {
    user.name = 'Alice';
    user.age = 28;
  } catch (error) {
    console.error(error.message);
  }

  print('User:', user);

  print('Unique Set:', [...uniqueSet]);
  print('Data Map:', Array.from(dataMap.entries()));

  print('Generated IDs:', gen.next().value, gen.next().value, gen.next().value);

  logUserInfo({ ...user, hobbies: ['reading', 'hiking'] });
})();
