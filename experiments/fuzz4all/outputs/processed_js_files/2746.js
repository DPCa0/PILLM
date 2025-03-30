 
const _name = Symbol('name');
const _age = Symbol('age');

class Person {
  constructor(name, age) {
    this[_name] = name;
    this[_age] = age;
  }

   
  greet() {
    print(`Hello, my name is ${this[_name]} and I am ${this[_age]} years old.`);
  }

   
  static compareAge(person1, person2) {
    return person1[_age] - person2[_age];
  }
}

 
const handler = {
  set(obj, prop, value) {
    if (prop === _age && (typeof value !== 'number' || value < 0)) {
      throw new Error('Age must be a non-negative number');
    }
    obj[prop] = value;
    return true;
  }
};

 
const john = new Proxy(new Person('John', 30), handler);
john.greet();

const jane = new Proxy(new Person('Jane', 25), handler);

 
const fetchPersonData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Alice', age: 28 }), 1000);
  });
};

(async () => {
  const personData = await fetchPersonData();
  const alice = new Proxy(new Person(personData.name, personData.age), handler);
  alice.greet();

  const comparisonResult = Person.compareAge(john, jane);
  print(`John is ${comparisonResult > 0 ? 'older' : 'younger'} than Jane.`);
})();
