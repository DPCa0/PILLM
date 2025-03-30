 

 
const targetObj = { a: 1, b: 2 };
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting property '${prop}'`);
      return target[prop];
    } else {
      throw new Error(`Property '${prop}' not found`);
    }
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  }
};
const proxyObj = new Proxy(targetObj, handler);

 
async function asyncOperation() {
  print('Starting async operation...');
  return new Promise((resolve) => {
    setTimeout(() => {
      print('Async operation completed.');
      resolve('Result from async operation');
    }, 1000);
  });
}

 
function* generatorFunc() {
  yield 'Step 1';
  yield 'Step 2';
  yield asyncOperation().then(result => `Step 3: ${result}`);
}

 
(async () => {
  print('Proxy and Generator Demo');

   
  try {
    print(proxyObj.a);  
    proxyObj.c = 3;  
    print(proxyObj.c);  
  } catch (error) {
    console.error(error.message);
  }

   
  const gen = generatorFunc();
  for (const step of gen) {
    if (step instanceof Promise) {
      print(await step);
    } else {
      print(step);
    }
  }
})();
