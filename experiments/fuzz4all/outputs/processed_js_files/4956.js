 

 
function* fetchDataGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve(10), 1000));
  yield new Promise(resolve => setTimeout(() => resolve(20), 1000));
  yield new Promise(resolve => setTimeout(() => resolve(30), 1000));
}

 
async function processData() {
  const dataGenerator = fetchDataGenerator();
  let result = 0;
  
  for await (let value of dataGenerator) {
    print('Fetched:', value);
    result += value;
  }
  
  return result;
}

 
const handler = {
  get(target, property) {
    if (property in target) {
      print(`Getting property '${property}'`);
      return target[property];
    } else {
      print(`Property '${property}' not found`);
      return undefined;
    }
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

 
const data = {
  value1: 5,
  value2: 15
};

 
const proxyData = new Proxy(data, handler);

 
(async function() {
  proxyData.value3 = await processData();
  print('Total Value:', proxyData.value3);
})();
