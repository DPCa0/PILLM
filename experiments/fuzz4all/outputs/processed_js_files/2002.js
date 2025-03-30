 
const asyncOperation = ms => new Promise(resolve => setTimeout(() => resolve(`Completed in ${ms}ms`), ms));

async function* asyncGenerator() {
  const delays = [1000, 2000, 3000];
  for (const delay of delays) {
    yield await asyncOperation(delay);
  }
}

const handler = {
  get: (target, property, receiver) => {
    print(`Accessing property "${property}"`);
    if (property in target) {
      return Reflect.get(target, property, receiver);
    } else {
      return `Property "${property}" not found`;
    }
  }
};

const obj = {
  name: 'Advanced JS',
  level: 'Expert',
  greet() {
    return `Hello from ${this.name} - Level: ${this.level}`;
  }
};

const proxiedObj = new Proxy(obj, handler);

 
print(proxiedObj.name);
print(proxiedObj.nonExistent);

 
(async () => {
  for await (let value of asyncGenerator()) {
    print(value);
  }
})();

 
print(proxiedObj.greet());
