 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const loggingHandler = {
  get: (target, prop, receiver) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

 
async function fetchData() {
  print('Fetching data...');
  await delay(1000);
  return { data: 'Sample data' };
}

 
async function processMultipleOperations() {
  const proxyData = new Proxy({ count: 0 }, loggingHandler);

  const operations = [
    (async () => { 
      await delay(500); 
      proxyData.count += 1;
      return 'Operation 1 Completed'; 
    })(),
    fetchData(),
    (async () => { 
      await delay(800); 
      proxyData.count += 2;
      return 'Operation 3 Completed'; 
    })()
  ];

  const results = await Promise.all(operations);
  print('All operations completed:', results);
  print('Final count:', proxyData.count);
}

 
processMultipleOperations().catch(console.error);
