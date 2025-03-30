 

 
const targetObject = {
  prop1: 42,
  prop2: "Hello"
};

 
async function* delayedGenerator() {
  for (const value of Object.values(targetObject)) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield value;
  }
}

 
async function iterateGenerator() {
  const gen = delayedGenerator();
  for await (const value of gen) {
    print(`Generated value: ${value}`);
  }
}

 
const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`Setting value '${value}' to property '${prop}'`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.prop1 = 100;
print(proxyObject.prop1);
proxyObject.prop2 = "World";
print(proxyObject.prop2);

 
iterateGenerator();
