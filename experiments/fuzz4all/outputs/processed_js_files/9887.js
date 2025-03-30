 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
const createLoggingProxy = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property '${prop}'`);
        return target[prop];
      }
      console.warn(`Property '${prop}' not found`);
      return undefined;
    },
    set(target, prop, value) {
      print(`Setting property '${prop}' to ${value}`);
      target[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  try {
    const dataProxy = createLoggingProxy({
      url: 'https://api.example.com/data',
      processedData: null
    });

    const response = await fetchData(dataProxy.url);
    dataProxy.processedData = response.data.map((num) => num * 2);
    print('Processed Data:', dataProxy.processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
