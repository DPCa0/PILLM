 
class Person {
  #privateInfo = "Classified";
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
   
  getPrivateInfo() {
    return this.#privateInfo;
  }

   
  static fromObject({ name, age }) {
    return new Person(name, age);
  }
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

 
async function main() {
   
  const results = await Promise.allSettled([
    Promise.resolve('Task 1 Completed'),
    Promise.reject('Task 2 Failed'),
    Promise.resolve('Task 3 Completed')
  ]);

  print(results);

   
  const personData = { name: 'Alice', age: 30 };
  const person = Person.fromObject(personData);
  const proxyPerson = new Proxy(person, loggingHandler);

   
  print(proxyPerson.name);
  print(proxyPerson.getPrivateInfo());
}

main().catch(console.error);
