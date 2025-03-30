 

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
async function logSequence() {
  const iterator = infiniteSequence();
  
  for (let i = 0; i < 10; i++) {
    const value = await new Promise(resolve => setTimeout(() => resolve(iterator.next().value), 1000));
    print(`Generated Value: ${value}`);
  }
}

 
const targetObject = {
  message: 'Hello, world!',
};

const handler = {
  get(target, property, receiver) {
    const value = Reflect.get(target, property, receiver);
    print(`Getting property '${property}' with value: ${value}`);
    return value;
  },
  set(target, property, value, receiver) {
    print(`Setting property '${property}' with value: ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const proxy = new Proxy(targetObject, handler);

 
proxy.message = 'Hello, Proxy!';
print(proxy.message);

 
logSequence();
