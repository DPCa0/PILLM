 

 
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function processValues(generator) {
  for (let value of generator) {
    print(`Processing value: ${value}`);
    await delay(1000);  
  }
  return "Processing complete!";
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const proxyObject = new Proxy({ message: "Hello, Proxy!" }, handler);

 
(async () => {
  print(proxyObject.message);  
  proxyObject.newProp = "New value!";  

  const generator = numberGenerator();
  const result = await processValues(generator);
  print(result);
})();
