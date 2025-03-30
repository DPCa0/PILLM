class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  *ageGenerator() {
    while (true) {
      yield this.age++;
    }
  }

  async fetchData() {
    const data = await fetch('https://api.agify.io?name=' + this.name)
      .then(response => response.json())
      .catch(error => console.error('Error fetching data:', error));
    return data.age;
  }
}

const personProxyHandler = {
  get(target, prop) {
    if (prop === 'age') {
      print(`Getting age: ${target.age}`);
      return target.age;
    }
    return target[prop];
  }
};

(async () => {
  const john = new Person('John', 30);
  const johnProxy = new Proxy(john, personProxyHandler);

  print(johnProxy.name);  
  print(johnProxy.age);  

  const ageIterator = john.ageGenerator();
  print(ageIterator.next().value);  
  print(ageIterator.next().value);  

  const estimatedAge = await john.fetchData();
  print(`Estimated age for ${john.name} is ${estimatedAge}`);
})();
