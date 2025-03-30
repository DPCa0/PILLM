 
const uniqueId = Symbol('id');
const person = {
  [uniqueId]: 1,
  name: 'John Doe',
  age: 30,
  hobbies: ['reading', 'gaming', 'coding'],
  address: {
    street: '123 Main St',
    city: 'Anytown',
    zip: '12345',
  },
   
  get fullAddress() {
    return `${this.address.street}, ${this.address.city}, ${this.address.zip}`;
  },
   
  growOlder(years = 1) {
    this.age += years;
  },
};

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return property in target ? target[property] : 'Property not found';
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const proxyPerson = new Proxy(person, handler);

 
print(proxyPerson.name);
proxyPerson.age = 31;
print(proxyPerson.fullAddress);
proxyPerson.growOlder(2);
print(proxyPerson.age);

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPerson() {
  print('Fetching person data...');
  await delay(2000);
  print('Person data fetched:', proxyPerson);
}

fetchPerson();

 
async function* asyncGenerator(array) {
  for (let item of array) {
    await delay(500);
    yield item;
  }
}

(async () => {
  for await (let hobby of asyncGenerator(proxyPerson.hobbies)) {
    print(`Enjoying hobby: ${hobby}`);
  }
})();
