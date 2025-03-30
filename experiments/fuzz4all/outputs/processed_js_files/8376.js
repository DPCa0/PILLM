 

 
async function* asyncGenerator() {
  for (let i = 0; i < 3; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
  }
}

 
const UNIQUE = Symbol('unique');

 
const target = {
  [UNIQUE]: 'hiddenValue'
};

const handler = {
  get: (obj, prop) => {
    if (prop === 'secret') {
      return `The secret value is: ${obj[UNIQUE]}`;
    }
    return obj[prop];
  }
};

const proxy = new Proxy(target, handler);

 
(async () => {
  print(proxy.secret);  

   
  for await (const value of asyncGenerator()) {
    print(`Async Generator Value: ${value}`);
  }
})();
