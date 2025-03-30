 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData() {
  print('Fetching data...');
  await delay(1000);  
  print('Data fetched.');
  return { data: 'Sample Data' };
}

 
const handler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

 
const observableData = new Proxy({ data: null }, handler);

(async function() {
   
  const result = await fetchData();
  observableData.data = result.data;

   
  print(`Current data: ${observableData.data}`);
})();
