 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
};

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

 
const processData = async (url) => {
  try {
    const { data } = await fetchData(url);

     
    const uniqueData = new Set(data);

     
    const transformedData = new Map([...uniqueData].map((num) => [num, num * 2]));

     
    const processedData = [...transformedData.values()];
    
     
    const proxyData = new Proxy(processedData, handler);
    
    print(proxyData[0]);  
    proxyData[0] = 42;  
    print(proxyData);

  } catch (error) {
    console.error(error);
  }
};

 
processData('https://example.com/data');
