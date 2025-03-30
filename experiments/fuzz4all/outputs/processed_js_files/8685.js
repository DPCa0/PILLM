 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fetchData(urls) {
  for (const url of urls) {
    print(`Fetching ${url}...`);
     
    await delay(1000);
    yield `Data from ${url}`;
  }
}

 
const dataHandler = {
  get(target, prop) {
    print(`Accessing property "${prop}"`);
    return target[prop];
  },
  set(target, prop, value) {
    print(`Setting property "${prop}" to "${value}"`);
    target[prop] = value;
    return true;
  }
};

 
const dataProxy = new Proxy({}, dataHandler);

 
const updateData = (key, value) => {
  if (Reflect.has(dataProxy, key)) {
    Reflect.set(dataProxy, key, value);
  } else {
    print(`Creating new property "${key}"`);
    Reflect.defineProperty(dataProxy, key, {
      value,
      configurable: true,
      enumerable: true,
      writable: true
    });
  }
};

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const iterator = fetchData(urls);
  
  for await (const data of iterator) {
    print(`Received: ${data}`);
     
    const dataKey = `prop${Date.now()}`;
    updateData(dataKey, data);
  }
  
   
  print(dataProxy);
})();
