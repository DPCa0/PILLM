class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

(async () => {
  try {
     
    const uniqueNames = new Set(['Alice', 'Bob', 'Charlie', 'Alice']);
    const persons = [...uniqueNames].map(name => new Person(name));

     
    const [alice, bob, charlie] = persons;
    print(alice.greet());
    print(bob.greet());
    print(charlie.greet());

     
    const data = await fetchData('https://api.example.com');
    print(`Fetched: ${data}`);

     
    const handler = {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        return `Property ${prop} does not exist.`;
      }
    };

    const proxiedPerson = new Proxy(alice, handler);
    print(proxiedPerson.name);  
    print(proxiedPerson.age);   

     
    const peopleMap = new Map();
    persons.forEach(person => peopleMap.set(person.name, person.greet()));

    for (const [name, greeting] of peopleMap) {
      print(`${name}: ${greeting}`);
    }
  } catch (error) {
    console.error('Error occurred:', error);
  }
})();
