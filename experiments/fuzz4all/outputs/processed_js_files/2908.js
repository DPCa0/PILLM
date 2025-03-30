 

 
async function asyncOperation(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));
}

 
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

 
const targetObject = {
  name: "Advanced JS",
  type: "Tutorial"
};

const handler = {
  get: (target, property, receiver) => {
    print(`Getting property: ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
const uniqueProperty = Symbol('unique');

 
async function main() {
   
  const [a, b, c] = [...generatorFunction()];
  
   
  const results = await Promise.all([a, b, c].map(async (num) => {
    return await asyncOperation(num);
  }));

  print('Results:', results);   

   
  print(proxyObject.name);   
  print(proxyObject.type);   

   
  proxyObject[uniqueProperty] = "Symbolic Value";
  print(proxyObject[uniqueProperty]);   
}

main().catch(console.error);
