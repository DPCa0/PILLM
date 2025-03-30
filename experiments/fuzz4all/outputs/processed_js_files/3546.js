 
class Person {
  #age;  
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }
  getAge() {
    return this.#age;
  }
}

 
const personProxy = new Proxy(Person, {
  construct(target, args) {
    print(`Creating a new person: ${args[0]}`);
    return new target(...args);
  },
  get(target, prop, receiver) {
    if (prop === 'name') {
      print('Accessing name property');
    }
    return Reflect.get(...arguments);
  },
});

 
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    yield response.json();
  }
}

 
const uniqueNames = new Set();
const dataStore = new Map();

async function handleData(urls) {
  for await (const data of fetchData(urls)) {
    const { name, id } = data;
    if (!uniqueNames.has(name)) {
      uniqueNames.add(name);
      dataStore.set(id, data);
    }
  }
  print([...uniqueNames]);
  print([...dataStore.entries()]);
}

 
function getPersonInfo(person) {
  const age = person?.getAge() ?? 'Unknown';
  print(`Name: ${person?.name}, Age: ${age}`);
}

 
const john = new personProxy('John Doe', 30);

 
getPersonInfo(john);
handleData(['https://api.example.com/data1', 'https://api.example.com/data2']);
