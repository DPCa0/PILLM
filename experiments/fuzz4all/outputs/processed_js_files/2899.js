 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

 
const user = {
  name: 'John Doe',
  age: 30
};

const userProxy = new Proxy(user, {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      throw new ReferenceError(`Property ${property} does not exist.`);
    }
  },
  set(target, property, value) {
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number.');
    }
    target[property] = value;
    return true;
  }
});

 
const uniqueNumbers = new Set([1, 2, 3, 4, 5, 5, 4]);

 
const mapExample = new Map();
mapExample.set('key1', 'value1');
mapExample.set('key2', 'value2');

 
const templateString = `User Info:
Name: ${userProxy.name}
Age: ${userProxy.age}
`;

 
(async () => {
  const generator = idGenerator();
  print(`Unique ID: ${generator.next().value}`);
  print(`Unique ID: ${generator.next().value}`);

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  print(templateString);
  print('Unique numbers:', Array.from(uniqueNumbers));
  print('Map Example:', Array.from(mapExample.entries()));

   
  print('User age:', userProxy.age);
  userProxy.age = 31;
  print('Updated user age:', userProxy.age);
   
})();