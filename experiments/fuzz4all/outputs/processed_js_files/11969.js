 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncNumbers() {
  let i = 0;
  while (true) {
    await delay(100);  
    yield i++;
  }
}

 
const target = {};
const handler = {
  get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} does not exist`,
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
async function processNumbers() {
  const asyncNumGen = asyncNumbers();
  proxy.counter = 0;  

  for await (const num of asyncNumGen) {
    if (num > 5) break;  
    print(`Number: ${num}, Proxy counter: ${proxy.counter}`);  
    proxy.counter = num + 1;  
  }
}

 
(async () => {
  await processNumbers();
})();
