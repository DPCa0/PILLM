(async function() {
   
  const fetchData = () => new Promise(resolve => setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000));
  
   
  function* processData(data) {
    for (let item of data) {
      yield item * item;
    }
  }

   
  const createLoggingProxy = (obj) => new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property '${prop}' with value: ${target[prop]}`);
      } else {
        print(`Property '${prop}' does not exist`);
      }
      return target[prop];
    }
  });

   
  const data = await fetchData();

   
  const processedData = processData(data);

   
  const processedDataMap = new Map();
  for (let value of processedData) {
    processedDataMap.set(value, value);
  }

   
  const proxyMap = createLoggingProxy(processedDataMap);

   
  for (let [key, value] of proxyMap) {
    print(`Key: ${key}, Value: ${value}`);
  }
})();
