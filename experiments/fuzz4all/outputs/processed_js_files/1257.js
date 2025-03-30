 

 
function* fetchDataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve('Data Part 1'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data Part 2'), 1000));
  yield new Promise(resolve => setTimeout(() => resolve('Data Part 3'), 1000));
}

 
async function processData() {
  const generator = fetchDataGenerator();
  let result = generator.next();
  while (!result.done) {
    const data = await result.value;
    print(data);
    result = generator.next();
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;  
proxyObject.b = 42;  
print(proxyObject.b);  

 
processData();
