 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
  print('Fetching data...');
  await delay(2000);
  return { data: 'Sample Data', timestamp: new Date() };
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

 
function* dataGenerator() {
  while (true) {
    yield fetchData();
  }
}

 
(async () => {
  const dataStream = dataGenerator();
  const dataStore = new Proxy({}, handler);

  for (let i = 0; i < 3; i++) {
    const { value: fetchDataPromise } = dataStream.next();
    const data = await fetchDataPromise;

     
    dataStore['lastFetchedData'] = data.data;
    print('Data:', dataStore['lastFetchedData']);
    print('Timestamp:', data.timestamp);
  }
})();
