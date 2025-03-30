 
class Person {
  #privateName;  

  constructor(name, age) {
    this.#privateName = name;
    this.age = age;
  }

   
  get name() {
    return this.#privateName;
  }

   
  ['isAdult']() {
    return this.age >= 18;
  }

   
  static compareByAge(p1, p2) {
    return p1.age - p2.age;
  }
}

 
const personHandler = {
  get(target, property) {
    if (property === 'name') {
      return `Name is private!`;
    }
    return Reflect.get(target, property);
  }
};

 
const person1 = new Proxy(new Person('Alice', 30), personHandler);
const person2 = new Proxy(new Person('Bob', 16), personHandler);

 
const promises = [
  Promise.resolve(person1),
  Promise.reject('Failed to fetch person2'),
  Promise.resolve(person2)
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        print(`Person ${index + 1}:`, result.value.name);
      } else {
        print(`Person ${index + 1} error:`, result.reason);
      }
    });
  });

 
(async () => {
  if (person1.isAdult()) {
    const { default: greeting } = await import('./greeting.js');  
    print(greeting);
  }
})();

Note: This code assumes that a `greeting.js` module exists in the same directory exporting a default greeting message. Adjust paths and logic according to your actual environment and needs.