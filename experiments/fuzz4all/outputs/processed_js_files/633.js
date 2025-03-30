 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
    }, 1000);
  });
};

 
const dataHandler = {
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

 
const processData = async () => {
  try {
    const rawData = await fetchData();
    
     
    const proxyData = new Proxy(rawData, dataHandler);
    
     
    const names = proxyData.map((user) => user.name.toUpperCase());
    
     
    print('Processed Names:', names);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
processData();
