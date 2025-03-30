 

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

const uniqueId = idGenerator();

 
const asyncObjectHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop} does not exist`;
    }
  },
  set(target, prop, value) {
    if (typeof value === 'number') {
      target[prop] = value;
    } else {
      throw new Error('Property value must be a number');
    }
  },
};

const asyncObject = new Proxy({ a: 1 }, asyncObjectHandler);

 
function asyncTask(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof value === 'number') {
        resolve(value * 2);
      } else {
        reject('Value must be a number');
      }
    }, 1000);
  });
}

 
async function processAsyncTasks() {
  try {
    let result = await asyncTask(asyncObject.a);
    print(`Result after first task: ${result}`);

    asyncObject.b = result;

     
    print(`Accessing non-existing property: ${asyncObject.c}`);

    result = await asyncTask(asyncObject.b);
    print(`Result after second task: ${result}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

processAsyncTasks();

print(`Unique ID 1: ${uniqueId.next().value}`);
print(`Unique ID 2: ${uniqueId.next().value}`);
