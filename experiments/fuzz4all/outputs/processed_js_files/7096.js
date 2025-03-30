 

(async () => {
   
  const _ = await import('https://cdn.skypack.dev/lodash');

   
  class Person {
    #name;  

    constructor(name) {
      this.#name = name;
    }

    getName() {
      return this.#name;
    }

    static createPeople(names) {
      return names.map(name => new Person(name));
    }
  }

   
  async function* fetchData() {
    const data = [1, 2, 3, 4, 5];
    for (const num of data) {
      await new Promise(resolve => setTimeout(resolve, 500));  
      yield num * num;  
    }
  }

   
  const handler = {
    get(target, property) {
      print(`Getting property '${property}'`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting property '${property}' to '${value}'`);
      target[property] = value;
      return true;
    }
  };

  const targetObject = { a: 1, b: 2 };
  const proxyObject = new Proxy(targetObject, handler);

   
  const names = ['Alice', 'Bob', 'Charlie'];
  const people = Person.createPeople(names);

  const capitalizedNames = _.map(names, _.capitalize);

   
  print('Async generated data:');
  for await (const num of fetchData()) {
    print(num);
  }

   
  proxyObject.a;
  proxyObject.b = 3;
  proxyObject.c = 4;

   
  print('People:', people.map(p => p.getName()));
  print('Capitalized Names:', capitalizedNames);
})();
