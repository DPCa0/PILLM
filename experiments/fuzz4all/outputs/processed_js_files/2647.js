 

 
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: "Important data" });
    }, 1000);
  });
}

 
function* dataGenerator() {
  yield fetchData();
  yield fetchData();
}

 
async function processGenerator(gen) {
  const iterator = gen();
  for await (const promise of iterator) {
    const result = await promise;
    print(result.data);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Set property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const targetObject = {
  message: "Hello Proxy"
};

 
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.message);  
proxyObject.message = "Hello World";  

 
processGenerator(dataGenerator);
