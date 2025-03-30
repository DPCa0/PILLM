 
const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const person = {
  name: 'Alice',
  age: 30,
};

const handler = {
  get(target, property) {
    print(`Accessed ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set(target, property, value) {
    if (property === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    target[property] = value;
    print(`Set ${property} to ${value}`);
    return true;
  },
};

const proxyPerson = new Proxy(person, handler);

 
const { name, age, ...rest } = proxyPerson;
print(name, age);

const extendedPerson = { ...proxyPerson, location: 'Wonderland' };
print(extendedPerson);

 
async function* asyncGenerator() {
  let i = 0;
  while (i < 3) {
    yield await Promise.resolve(i++);
  }
}

(async () => {
  for await (const num of asyncGenerator()) {
    print(`Async Generator Yielded: ${num}`);
  }
})();

 
class Vehicle {
  #model;
  #year;

  constructor(model, year) {
    this.#model = model;
    this.#year = year;
  }

  #getDetails() {
    return `${this.#model}, ${this.#year}`;
  }

  showDetails() {
    print(this.#getDetails());
  }
}

const car = new Vehicle('Tesla', 2023);
car.showDetails();

 
(async () => {
  const data = await fetchJson('https://jsonplaceholder.typicode.com/todos/1');
  print(data);
})();
