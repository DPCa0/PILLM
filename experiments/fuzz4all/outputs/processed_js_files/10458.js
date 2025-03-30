class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async () => {
  await delay(2000);
  return { message: 'Data fetched successfully!' };
};

const printFetchedData = async () => {
  try {
    const data = await fetchData();
    print(data.message);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const createProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop in obj) {
        return obj[prop];
      } else {
        throw new Error(`Property "${prop}" does not exist.`);
      }
    },
  });
};

const person = new Person('Alice');
const proxiedPerson = createProxy(person);

(async () => {
  print(proxiedPerson.greet());

  const set = new Set([1, 2, 3, 4]);
  set.add(5);

  const map = new Map([
    ['key1', 'value1'],
    ['key2', 'value2'],
  ]);

  const iterableObject = {
    *[Symbol.iterator]() {
      yield* set;
      yield* map.values();
    },
  };

  for (const item of iterableObject) {
    print(item);
  }

  await printFetchedData();
})();
