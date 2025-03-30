 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData(url) {
  print(`Fetching data from ${url}...`);
  await delay(Math.random() * 2000);  
  return `Data from ${url}`;
}

 
const dataHandler = {
  get: (target, property) => {
    print(`Accessing property ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const dataStore = new Proxy({}, dataHandler);

 
(async () => {
  try {
    const urls = ['https://api1.example.com', 'https://api2.example.com'];

     
    const results = await Promise.all(urls.map(url => fetchData(url)));
    results.forEach((result, index) => {
      dataStore[`data${index + 1}`] = result;
    });

     
    print(dataStore.data1);
    print(dataStore.data2);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
