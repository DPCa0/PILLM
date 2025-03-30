 

 
const randomDelay = () => new Promise(res => setTimeout(res, Math.random() * 1000));

 
async function fetchData(key) {
  await randomDelay();
  return `Value for ${key}`;
}

 
const handler = {
  get: async function(target, prop, receiver) {
    if (!target.has(prop)) {
      target.set(prop, await fetchData(prop));
    }
    return target.get(prop);
  }
};

 
const proxyMap = new Proxy(new Map(), handler);

 
(async () => {
  const keys = ['alpha', 'beta', 'gamma'];
  
   
  const values = await Promise.all(keys.map(async key => {
    const value = await proxyMap[key];
    return { key, value };
  }));

   
  values.forEach(({ key, value }) => {
    print(`${key}: ${value}`);
  });
})();
