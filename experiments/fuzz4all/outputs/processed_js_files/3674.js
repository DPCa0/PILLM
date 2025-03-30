 

 
function simulateAsyncAPI(data, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

 
async function* fetchAsyncData() {
  const data1 = await simulateAsyncAPI('Data 1', 1000);
  yield data1;
  const data2 = await simulateAsyncAPI('Data 2', 2000);
  yield data2;
  const data3 = await simulateAsyncAPI('Data 3', 1500);
  yield data3;
}

 
const dataHandler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return property in target ? target[property] : 'Property not found';
  },
  set(target, property, value) {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

 
async function runAsyncGenerator() {
  const dataProxy = new Proxy({}, dataHandler);
  
  for await (const data of fetchAsyncData()) {
    print('Received:', data);
     
    dataProxy.latest = data;
    print('Proxy check:', dataProxy.latest);
  }
  
  print('Final Proxy Object:', dataProxy);
}

 
runAsyncGenerator().catch(console.error);
