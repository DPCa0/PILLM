 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
};

const processData = async (url) => {
  try {
    const { data } = await fetchData(url);  
    const result = data.map(({ id, value }) => ({ id, value: value * 2 }));  
    return result;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

const url = 'https://api.example.com/data';

const dataProxyHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessed property ${prop}`);
      return target[prop];
    }
    console.warn(`Property ${prop} not found`);
    return undefined;
  },
};

const startProcess = async () => {
  const processedData = await processData(url);
  if (processedData) {
    const proxyData = new Proxy(processedData, dataProxyHandler);
    print(proxyData[0]);  
    print(proxyData.nonExistent);  
  }
};

startProcess();
