 

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property: ${prop}`);
      return target[prop];
    } else {
      throw new Error(`Property ${prop} does not exist.`);
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number') {
      print(`Setting property: ${prop} to value: ${value}`);
      target[prop] = value;
      return true;
    } else {
      throw new Error(`Value for ${prop} must be a number.`);
    }
  }
};

const originalObject = { a: 1, b: 2 };
const proxy = new Proxy(originalObject, handler);

 
const uniqueKey = Symbol('unique');

const complexObject = {
  [uniqueKey]: 'hiddenValue',
  doSomething: function() {
    print('Doing something complex...');
  },
  *complexGenerator() {
    yield* [1, 2, 3];
  }
};

 
const proxyComplex = new Proxy(complexObject, handler);

proxyComplex.doSomething();

for (const num of proxyComplex.complexGenerator()) {
  print(`Generated number: ${num}`);
}

 
const data = [10, undefined, 30];
const [first = 0, second = 20, third = 40] = data;
print(`Destructured values: ${first}, ${second}, ${third}`);

 
async function fetchData() {
  try {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('Data fetched successfully!'), 1000);
    });
    const result = await promise;
    print(result);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();

 
function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

const nums = [1, 2, 3, 4];
print(`Sum: ${sum(...nums)}`);
