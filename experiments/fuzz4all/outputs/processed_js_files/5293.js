class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  get details() {
    return `${this.#name}, ${this.#age} years old`;
  }
  
  async *asyncGenerator(start = 0, end = 3) {
    for (let i = start; i <= end; i++) {
      yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
  }
}

const proxyHandler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist`);
      return undefined;
    }
  }
};

const user = new Proxy(new Person("Alice", 30), proxyHandler);

(async () => {
  print(user.details);   
  for await (let num of user.asyncGenerator()) {
    print(`Async Generator yielded: ${num}`);
  }
})();
