 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const validator = {
  set: (obj, prop, value) => {
    if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new CustomError('Invalid age');
    }
    obj[prop] = value;
    return true;
  }
};

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new CustomError('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

 
async function fetchAllData(urls) {
  const requests = urls.map(url => fetchData(url));
  const results = await Promise.allSettled(requests);
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Data from URL ${urls[index]}:`, result.value);
    } else {
      console.error(`Error fetching from URL ${urls[index]}:`, result.reason);
    }
  });
}

 
class Person {
  constructor(name, age) {
    return new Proxy(this, validator);
  }
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const generateId = idGenerator();
const person = new Person();
person.name = 'Alice';
person.age = 25;

print(`New Person: ${person.name}, ID: ${generateId.next().value}`);

 
const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
fetchAllData(urls).catch(error => console.error('An error occurred:', error.message));
