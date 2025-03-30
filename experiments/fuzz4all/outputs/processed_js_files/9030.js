class Singleton {
  constructor(name = 'Default') {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.name = name;
    Singleton.instance = this;
  }

  getName() {
    return this.name;
  }
}

const modulePattern = (() => {
  let privateCounter = 0;

  function privateMethod() {
    return `Current count is ${privateCounter}`;
  }

  return {
    increment: () => privateCounter++,
    decrement: () => privateCounter--,
    getCounter: () => privateMethod(),
  };
})();

const asyncProcess = async () => {
  try {
    const fetchPromise = fetch('https://jsonplaceholder.typicode.com/todos/1');
    const [singleton1, singleton2, response] = await Promise.all([
      new Singleton('FirstInstance'),
      new Singleton('SecondInstance'),
      fetchPromise,
    ]);

    const data = await response.json();
    print('Singleton Name:', singleton1.getName());  
    print('Are both singletons the same?', singleton1 === singleton2);  
    print('Fetched Data:', data);

    print(modulePattern.getCounter());
    modulePattern.increment();
    print(modulePattern.getCounter());
    modulePattern.increment();
    print(modulePattern.getCounter());
    modulePattern.decrement();
    print(modulePattern.getCounter());
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

asyncProcess();
