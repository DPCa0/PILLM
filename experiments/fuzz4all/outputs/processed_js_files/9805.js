 

 
const fetchData = (delay, value) => new Promise((resolve) => setTimeout(() => resolve(value), delay));

 
const getData = async () => {
  const promises = [
    fetchData(1000, 'Data from API 1'),
    fetchData(2000, 'Data from API 2'),
    fetchData(3000, 'Data from API 3'),
  ];

  const results = await Promise.allSettled(promises);
  
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      print(`Fulfilled: ${result.value}`);
    } else {
      console.error(`Rejected: ${result.reason}`);
    }
  });
};

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return target[prop];
  },
  set: function(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataStore = new Proxy({}, handler);

 
(async () => {
  print('Starting data fetching...');
  await getData();

   
  const addData = (key, value) => {
    print(`Adding ${key}: ${value}`);
    dataStore[key] = value;
  };

  addData('info1', 'Sample Information 1');
  addData('info2', 'Sample Information 2');

  print(`Current Data Store: ${JSON.stringify(dataStore)}`);
})();
