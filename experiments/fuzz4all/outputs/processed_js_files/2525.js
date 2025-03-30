 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);  
  return { data: 'Hello from async data!', time: Date.now() };
}

 
function* dataGenerator() {
  while (true) {
    yield fetchData();
  }
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Accessing property: ${property}`);
      return Reflect.get(target, property);
    } else {
      throw new Error(`Property ${property} does not exist`);
    }
  },
  set(target, property, value) {
    print(`Setting property: ${property} with value: ${value}`);
    return Reflect.set(target, property, value);
  }
};

 
const dynamicData = {
  message: 'Initial data',
  timestamp: Date.now()
};

 
const proxiedData = new Proxy(dynamicData, handler);

(async () => {
   
  const generator = dataGenerator();
  
   
  for (let i = 0; i < 3; i++) {
    const result = await generator.next().value;
    proxiedData.message = result.data;
    proxiedData.timestamp = result.time;
    print(`Message: ${proxiedData.message}, Timestamp: ${proxiedData.timestamp}`);
  }
})();
