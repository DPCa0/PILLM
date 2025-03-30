 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');
  await delay(2000);
  return { data: 'some data', timestamp: new Date() };
}

 
const handler = {
  get: (target, prop) => {
    if (prop === 'data') {
      return `Processed: ${target[prop].toUpperCase()}`;
    }
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    if (prop === 'timestamp' && value instanceof Date) {
      target[prop] = value.toISOString();
      return true;
    }
    return Reflect.set(target, prop, value);
  }
};

 
(async () => {
  try {
    const rawData = await fetchData();
    const proxiedData = new Proxy(rawData, handler);

     
    print(proxiedData.data);  
    print(proxiedData.timestamp);  

     
    proxiedData.timestamp = new Date();
    print(proxiedData.timestamp);  
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
