 

 
function* generateData() {
  let id = 0;
  while (true) {
    yield { id: id++, value: Math.random() };
  }
}

 
async function fetchData(id) {
   
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { id, data: `Data for ID: ${id}` };
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

 
const dataStore = {};

 
const proxiedDataStore = new Proxy(dataStore, loggingHandler);

 
(async function main() {
  const dataGenerator = generateData();
  for (let i = 0; i < 3; i++) {
    const { id, value } = dataGenerator.next().value;
    const fetchedData = await fetchData(id);
    proxiedDataStore[id] = { generatedValue: value, fetchedData: fetchedData.data };
  }
  
  print("Final Proxied Data Store:", proxiedDataStore);
})();
