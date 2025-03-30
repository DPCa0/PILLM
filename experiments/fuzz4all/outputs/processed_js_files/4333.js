 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
const dataHandler = {
  get: (obj, prop) => {
    print(`Accessing property: ${prop}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

 
const dataSet = new Set();

 
(async () => {
  try {
    const url = 'https://api.example.com/data';
    const response = await fetchData(url);
    
    const proxyData = new Proxy(response.data, dataHandler);
    
    proxyData.forEach(item => {
      dataSet.add(item);
    });

    print('Unique Data Set:', dataSet);

     
    const uniqueID = Symbol('id');
    proxyData[uniqueID] = 'SpecialID123';

    print('Data with Symbol:', proxyData[uniqueID]);

  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
})();
