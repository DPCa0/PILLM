 
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing property "${property}"`);
      return target[property];
    } else {
      throw new ReferenceError(`Property "${property}" does not exist.`);
    }
  }
};

const monitoredObject = new Proxy({ a: 1, b: 2 }, handler);

 
function asyncOperation(value) {
  return new Promise(resolve => {
    setTimeout(() => resolve(value * 2), 1000);
  });
}

async function runAsyncOperations() {
  const results = await Promise.all([1, 2, 3].map(asyncOperation));
  print('Async operations result:', results);
}

 
function processNumbers(...numbers) {
  const [first, ...rest] = numbers;
  print(`First number: ${first}, Rest: ${rest.join(', ')}`);
  return rest.reduce((a, b) => a + b, 0);
}

 
async function main() {
   
  print('Range from 1 to 5:');
  for (let num of range(1, 5)) {
    print(num);
  }

   
  try {
    print(monitoredObject.a);
    print(monitoredObject.c);  
  } catch (error) {
    console.error(error.message);
  }

   
  await runAsyncOperations();

   
  print('Sum of remaining numbers:', processNumbers(10, 20, 30, 40));
}

main();
