 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print('Fetching data...');

   
  await delay(1000);

   
  const data = { id: 1, name: 'Sample Data' };
  print('Data fetched:', data);
  return data;
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const dataHandler = {
  data: null,
  getData: async function() {
    if (!this.data) {
      this.data = await fetchData();
    }
    return this.data;
  }
};

 
const proxyDataHandler = new Proxy(dataHandler, handler);

 
(async () => {
  const data = await proxyDataHandler.getData();
  print('Processed data:', data);
  
   
  const { id, name } = data;
  print(`Data: ID = ${id}, Name = ${name}`);
})();
