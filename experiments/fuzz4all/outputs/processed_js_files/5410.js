 

 
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing property '${prop}': ${target[prop]}`);
      return target[prop];
    }
    return `Property '${prop}' is not defined`;
  }
};

 
function* operationSequence() {
  yield 'Start operation';
  yield 'Processing data';
  yield 'Finalizing';
}

 
(async function main() {
  const myObject = { name: 'JavaScript', type: 'Language' };
  const proxyObject = new Proxy(myObject, handler);

  const gen = operationSequence();
  
  for (let operation of gen) {
    print(operation);
    await delay(500);  
  }

  const { name, type } = proxyObject;  
  print(`The object represents a ${type}: ${name}`);
})();
