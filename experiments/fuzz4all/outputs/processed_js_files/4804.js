 

 
function* generateValues() {
  yield* [1, 2, 3, 4, 5];
}

 
async function processValues() {
  const generator = generateValues();
  let result = generator.next();
  while (!result.done) {
    print(await asyncSquare(result.value));  
    result = generator.next();
  }
}

 
function asyncSquare(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * num);
    }, 100);
  });
}

 
const uniqueKey = Symbol('uniqueKey');
const myObject = {
  [uniqueKey]: 'This is a unique value',
};

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting the property '${String(prop)}'`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting the property '${String(prop)}' to '${value}'`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxiedObject = new Proxy(myObject, handler);

 
print(proxiedObject[uniqueKey]);  
proxiedObject[uniqueKey] = 'New unique value';  

 
processValues();
