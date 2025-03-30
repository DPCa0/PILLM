 
const data = {
  users: [
    { name: 'Alice', age: 28 },
    { name: 'Bob', age: 33 },
    { name: 'Charlie', age: 22 }
  ]
};

const handler = {
  get(target, prop) {
    if (prop === 'getData') {
      return async () => {
        print('Fetching data...');
        const result = await new Promise((resolve) => setTimeout(() => resolve(target.users), 1000));
        return result;
      };
    }
    return target[prop];
  }
};

const proxy = new Proxy(data, handler);

const uniqueOperation = Symbol('performUniqueOperation');

class DataProcessor {
  constructor() {
    this.operations = [];
  }

  [uniqueOperation](user) {
    return {
      ...user,
      isAdult: user.age >= 18
    };
  }

  async processUsers() {
    const users = await proxy.getData();
    this.operations = users.map(user => this[uniqueOperation](user));
    this.operations.forEach(op => print(`Processed: ${JSON.stringify(op)}`));
  }
}

(async () => {
  const processor = new DataProcessor();
  await processor.processUsers();
})();
