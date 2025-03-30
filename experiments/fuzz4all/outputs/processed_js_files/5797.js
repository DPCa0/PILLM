 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  print("Fetching data...");
  await delay(1000);  
  return { id: 1, name: "Sample Data" };
}

 
function* dataGenerator(initialData) {
  yield initialData;
  let id = initialData.id + 1;
  while (true) {
    yield { id: id++, name: `Dynamic Data ${id}` };
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return Reflect.get(target, prop);
    } else {
      print(`Property ${prop} does not exist`);
    }
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
async function main() {
  const initialData = await fetchData();
  
  const generator = dataGenerator(initialData);
  
   
  const monitoredData = new Proxy(generator.next().value, handler);
  
  print(monitoredData.id);   
  monitoredData.name = "Updated Data";   
  print(monitoredData.name);   
  
  const nextData = generator.next().value;
  print(`Generated next data:`, nextData);
}

main();
