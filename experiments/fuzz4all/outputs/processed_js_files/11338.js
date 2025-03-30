class Person {
  #privateAge;
  
  constructor(name, age) {
    this.name = name;
    this.#privateAge = age;
  }
  
  get age() {
    return this.#privateAge;
  }
  
  set age(newAge) {
    if (newAge > 0) {
      this.#privateAge = newAge;
    } else {
      print("Age must be positive");
    }
  }
  
  greet() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Hello, my name is ${this.name} and I am ${this.#privateAge} years old.`);
      }, 1000);
    });
  }
}

async function showGreeting() {
  const person = new Person("Alice", 30);
  print(`Initial: ${await person.greet()}`);
  
  person.age = -5;  
  person.age = 31;  
  
  print(`Updated: ${await person.greet()}`);
  
  const calculate = (x, y) => x ** y;  
  
   
  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(...arguments);
      } else {
        print(`${prop} doesn't exist on target`);
        return undefined;
      }
    }
  };
  
  const proxyPerson = new Proxy(person, handler);
  print(proxyPerson.name); // Alice
  print(proxyPerson.nonExistentProp); // Logs: nonExistentProp doesn't exist on target

   
  const uniqueKey = Symbol("unique");
  proxyPerson[uniqueKey] = "Unique Value";
  print(proxyPerson[uniqueKey]);
}

showGreeting();
