 

 
const fetchData = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: `Item ${id}` }), 100);
  });
};

 
const uniqueIds = new Set([1, 2, 3, 4, 5]);

 
const dataMap = new Map();

 
const handler = {
  get: (target, prop) => {
    print(`Getting property: ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const proxyDataMap = new Proxy(dataMap, handler);

(async () => {
   
  for (const id of uniqueIds) {
     
    const data = await fetchData(id);

     
    proxyDataMap.set(id, data);
  }

   
  for (const [key, value] of proxyDataMap) {
    print(`ID: ${key}, Name: ${value.name}`);
  }
})();
