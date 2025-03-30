 

 
const fetchData = async (endpoint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${endpoint}`);
    }, Math.random() * 2000);
  });
};

 
const processData = (data) => {
  return data.toUpperCase();
};

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property ${prop} with value: ${target[prop]}`);
      return target[prop];
    }
    return `Property ${prop} not found`;
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

 
const main = async () => {
  const endpoints = ['endpoint1', 'endpoint2', 'endpoint3'];
  try {
    const fetchPromises = endpoints.map((endpoint) => fetchData(endpoint));
    const results = await Promise.all(fetchPromises);

     
    const transformedData = new Proxy({}, dataHandler);
    results.forEach((result, index) => {
      transformedData[`processedData${index + 1}`] = processData(result);
    });

     
    print(transformedData.processedData1);
    print(transformedData.processedData2);
    print(transformedData.processedData3);
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
};

 
main();
