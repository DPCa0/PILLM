 

 
const randomTimeout = () => new Promise((resolve) => {
  setTimeout(() => resolve("Resolved after random time"), Math.random() * 2000);
});

 
async function callWithTimeout() {
  const result = await randomTimeout();
  print(result);
}

 
function* numberGenerator(max) {
  let num = 0;
  while (num <= max) {
    yield num++;
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property: ${prop}`);
      return target[prop];
    } else {
      print(`Property not found: ${prop}`);
      return undefined;
    }
  },
  set(target, prop, value) {
    print(`Setting property: ${prop} to value: ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const targetObject = {
  a: 1,
  b: 2
};

 
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;  
proxyObject.b = 3;  
proxyObject.c;  

 
const gen = numberGenerator(5);
for (let number of gen) {
  print(number);
}

 
(async () => {
  for (let i = 0; i < 3; i++) {
    await callWithTimeout();
  }
})();
