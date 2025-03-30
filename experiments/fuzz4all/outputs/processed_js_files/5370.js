 

 
class Person {
  #age;  
  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  getAge() {
    return this.#age;
  }

  static fromObject(obj) {
    const { name, age } = obj;
    return new Person(name, age);
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop === 'secret') {
      return 'Access Denied';
    }
    return target[prop];
  }
};

 
const personMap = new Map();
const guardedMap = new Proxy(personMap, {
  get(target, prop) {
    if (prop === 'delete') {
      return () => print('Deletion is not allowed');
    }
    return target[prop].bind(target);
  }
});

 
const person1 = new Person('Alice', 30);
const proxiedPerson = new Proxy(person1, handler);
guardedMap.set('alice', proxiedPerson);

 
async function* fetchPersonData() {
  const personData = [
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 }
  ];
  for (const data of personData) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield Person.fromObject(data);
  }
}

 
(async () => {
  print(`Name: ${proxiedPerson.name}, Age: ${proxiedPerson.getAge()}`);
  print(`Secret: ${proxiedPerson.secret}`);
  print('---');

  const personIterator = fetchPersonData();
  for await (const person of personIterator) {
    guardedMap.set(person.name.toLowerCase(), new Proxy(person, handler));
    print(`Fetched: ${person.name} - Age: ${person.getAge()}`);
  }
})();
