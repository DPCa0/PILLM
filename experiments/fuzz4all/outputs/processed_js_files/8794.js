 

 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property ${prop}: ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property ${prop} not found`;
    }
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

 
const targetObject = { name: 'Advanced JS', version: 1.0 };

 
const proxyObject = new Proxy(targetObject, handler);

 
const delayedResponse = (message, delay) => 
  new Promise((resolve) => setTimeout(() => resolve(message), delay));

 
async function asyncExample() {
  const message1 = await delayedResponse('Hello', 1000);
  print(message1);  

  const message2 = await delayedResponse('Proxy World', 1000);
  print(message2);  
}

 
proxyObject.name = 'Super JS';
print(proxyObject.name);  

 
asyncExample();
