 

 
const targetObject = {
  message1: 'Hello',
  message2: 'World'
};

const handler = {
  get(target, property) {
    print(`Property '${property}' has been accessed.`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Property '${property}' is being set to '${value}'.`);
    return Reflect.set(target, property, value);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
async function* fetchMessages() {
  for (const key of Object.keys(proxyObject)) {
    yield new Promise((resolve) => setTimeout(() => resolve(proxyObject[key]), 1000));
  }
}

 
async function displayMessages() {
  for await (const message of fetchMessages()) {
    print(message);
  }
}

 
proxyObject.message1;  
proxyObject.message2 = "Everyone";  

 
displayMessages().then(() => print('All messages have been displayed.'));
