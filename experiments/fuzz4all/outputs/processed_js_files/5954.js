 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`GET ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
    return `No such property as "${prop}"!`;
  },
  set(target, prop, value) {
    print(`SET ${prop} = ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const uniqueId = Symbol('id');

 
const originalObject = {
  name: 'Complex Object',
  [uniqueId]: 123
};

 
const proxyObject = new Proxy(originalObject, handler);

 
function* propertyNames(obj) {
  for (const key of Object.keys(obj)) {
    yield key;
  }
}

 
async function complexOperation() {
   
  print(proxyObject.name);  
  proxyObject.age = 30;           

   
  print(`Unique ID: ${proxyObject[uniqueId]}`);

   
  const newProperty = Reflect.defineProperty(proxyObject, 'type', { value: 'advanced', writable: true });
  if (newProperty) {
    print(`Added new property 'type': ${proxyObject.type}`);
  }

   
  for (let prop of propertyNames(proxyObject)) {
    print(`Property Name: ${prop}`);
  }
}

 
(async () => {
  await complexOperation();
})();
