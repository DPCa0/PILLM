 
class Person {
  #firstName;
  #lastName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
  }

   
  #getFullName() {
    return `${this.#firstName} ${this.#lastName}`;
  }

   
  greet() {
    print(`Hello, my name is ${this.#getFullName()}.`);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'greet') {
      print("Greet method is being called.");
    }
    return Reflect.get(target, prop, receiver);
  }
};

const johnDoe = new Person("John", "Doe");
const proxy = new Proxy(johnDoe, handler);
proxy.greet();  

 
async function fetchData() {
  const mockFetch = new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
  });

  try {
    const response = await mockFetch;
    print('Data fetched:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  
print(gen.next().value);  

 
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = [...array1, ...array2];
print('Merged array:', mergedArray);

 
const uniqueValues = new Set([1, 2, 2, 3, 4, 5, 5]);
print('Unique values:', [...uniqueValues]);

 
const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);