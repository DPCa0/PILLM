 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);  
  return { name: 'Alice', age: 30, location: 'Wonderland' };
}

 
async function processData() {
  const { name, ...rest } = await fetchData();
  const newData = { ...rest, status: 'Active' };
  return newData;
}

 
const dataMap = new Map();

 
const handler = {
  get: (target, prop) => {
    if (prop === 'size') {
      print(`Current size: ${target.size}`);
    }
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting data for ${prop}`);
    target[prop] = value;
    return true;
  },
};

const proxiedDataMap = new Proxy(dataMap, handler);

(async () => {
  const userData = await processData();
  const { age, status } = userData;
  proxiedDataMap.set('user', userData);
  
   
  print(`User data: ${JSON.stringify(proxiedDataMap.get('user'))}`);
  print(`Map size: ${proxiedDataMap.size}`);
})();
