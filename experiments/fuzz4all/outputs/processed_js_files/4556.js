 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function delayedLog(item, ms) {
  await delay(ms);
  print(item);
}

 
function* generatorFunc() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

 
const target = { message: "Hello, Proxy!" };
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property "${prop}" not found`),
  set: (obj, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};
const proxy = new Proxy(target, handler);

 
(async function complexFunction() {
  const iterator = generatorFunc();
  
   
  print(proxy.message);
  proxy.newProp = "New Property Added!";
  print(proxy.newProp);
  print(proxy.nonExistentProp);
  
   
  await delayedLog(`Generated: ${iterator.next().value}`, 1000);
  await delayedLog(`Generated: ${iterator.next().value}`, 1000);
  await delayedLog(`Generated: ${iterator.next().value}`, 1000);
})();
