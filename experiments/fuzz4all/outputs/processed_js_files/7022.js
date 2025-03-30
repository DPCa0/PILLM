 

 
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.2 ? resolve({ data: 'Fetched Data', status: 200 }) : reject('Network Error');
  }, 1000);
});

 
async function processData() {
  try {
    const response = await fetchData();
    print(`Status: ${response.status}, Data: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      console.warn(`Property ${property} not found`);
      return 'Default Value';
    }
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const dataStore = new Proxy({ storedData: 'Initial Data' }, handler);

 
(async () => {
  const newData = await processData();
  if (newData) {
    dataStore.storedData = newData;
  }
  print(`Accessing storedData: ${dataStore.storedData}`);
  print(`Accessing nonExistent: ${dataStore.nonExistent}`);
})();
