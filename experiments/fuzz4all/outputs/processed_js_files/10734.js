 

const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: 'Sample Data from API' });
    }, 1000);
  });
};

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop} property`);
    return Reflect.get(target, prop, receiver);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting ${prop} property to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
(async () => {
  try {
    const data = await fetchData();  
    print('Data fetched:', data);

    const dataProxy = new Proxy(data, handler);  

    print(dataProxy.data);  

    dataProxy.data = 'Modified Data';  

    print('Modified data:', dataProxy.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
