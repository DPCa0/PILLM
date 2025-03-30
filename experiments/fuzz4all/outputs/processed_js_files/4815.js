 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Sample data from " + url });
    }, 1000);
  });
};

 
const getDataFromSources = async (sources) => {
  const promises = sources.map(source => fetchData(source));
  const results = await Promise.all(promises);
  return results;
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting property: ${prop} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  const sources = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const data = await getDataFromSources(sources);
  print('Fetched data:', data);

  const originalObject = { name: 'Alice', age: 30 };
  const proxiedObject = createLoggingProxy(originalObject);

   
  print(proxiedObject.name);
  proxiedObject.age = 31;
  print(proxiedObject.age);
})();
