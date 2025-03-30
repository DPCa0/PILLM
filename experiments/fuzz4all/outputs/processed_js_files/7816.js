 
class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get details() {
    return `${this.#name} is ${this.#age} years old.`;
  }

   
  static compareAge(person1, person2) {
    return person1.#age - person2.#age;
  }
}

 
const handler = {
  get: (obj, prop) => {
    print(`Accessing property "${prop}"`);
    return obj[prop];
  }
};

const person = new Person('Alice', 30);
const proxiedPerson = new Proxy(person, handler);

 
function tag(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string.toUpperCase()}${values[i] || ''}`, '');
}

print(tag`Details: ${proxiedPerson.details}`);

 
async function fetchData() {
  const data = await new Promise((resolve) => setTimeout(() => resolve('fetched data'), 1000));
  print(`Async Operation Result: ${data}`);
}

fetchData();

 
const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);

for (const [key, value] of map.entries()) {
  print(`${key}: ${value}`);
}

const set = new Set([1, 2, 3, 3, 4]);
print('Unique values in set:', [...set]);
