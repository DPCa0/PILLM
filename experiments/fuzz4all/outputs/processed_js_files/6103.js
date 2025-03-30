 

function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

const asyncTask = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

async function asyncGeneratorHandler(generator) {
  for await (const num of generator) {
    print(`Number: ${num}`);
    if (num >= 5) break;
    await asyncTask(500);  
  }
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      return target[prop];
    }
    return `Property '${prop}' does not exist on target object`;
  },
  set: (target, prop, value) => {
    print(`Setting value '${value}' to property '${prop}'`);
    target[prop] = value;
    return true;
  }
};

const targetObj = {};
const proxy = new Proxy(targetObj, handler);

proxy.name = "Advanced JavaScript";
print(proxy.name);  
print(proxy.nonExistentProp);  

const generatorInstance = numberGenerator();
asyncGeneratorHandler(generatorInstance);
