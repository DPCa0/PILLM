 

 
function* asyncGenerator() {
  yield Promise.resolve(1);
  yield Promise.resolve(2);
  yield Promise.resolve(3);
}

 
async function handleGenerator(gen) {
  const iterator = gen();
  let result = iterator.next();
  
  while (!result.done) {
    const value = await result.value;  
    print('Value from generator:', value);
    result = iterator.next();
  }
}

 
const target = {
  message: 'Hello, World!',
  number: 42
};

const handler = {
  get: (obj, prop) => {
    print(`Getting ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
proxy.message = 'Hello, JavaScript!';
print(proxy.message);

 
handleGenerator(asyncGenerator);
