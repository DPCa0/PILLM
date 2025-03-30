 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const handler = {
  set(target, property, value) {
    print(`Property '${property}' changed from ${target[property]} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
async function reactiveChange(obj, prop, value) {
  print(`Starting change for '${prop}' to ${value}`);
  await delay(1000);  
  obj[prop] = value;
  print(`Change for '${prop}' completed`);
}

 
const reactiveObject = new Proxy({ a: 1, b: 2 }, handler);

 
(async () => {
  await reactiveChange(reactiveObject, 'a', 10);
  await reactiveChange(reactiveObject, 'b', 20);
})();
