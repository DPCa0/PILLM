 

 
function randomTimeout() {
  return new Promise((resolve) => {
    const time = Math.floor(Math.random() * 1000);
    setTimeout(() => resolve(`Resolved after ${time} ms`), time);
  });
}

 
async function handleTimeouts() {
  for (let i = 0; i < 3; i++) {
    const message = await randomTimeout();
    print(message);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const obj = {
  name: 'Advanced JavaScript',
  version: 'ES6+'
};

 
const proxiedObj = new Proxy(obj, handler);

 
Reflect.set(proxiedObj, 'version', 'ES2023');
print(Reflect.get(proxiedObj, 'name'));  

 
handleTimeouts();
