 

 
async function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: `Data from ${endpoint}` });
    }, Math.random() * 2000);
  });
}

 
function* requestGenerator(endpoints) {
  for (let endpoint of endpoints) {
    yield fetchData(endpoint);
  }
}

 
async function processRequests(generator) {
  const results = [];
  for (let promise of generator) {
    results.push(await promise);
  }
  return results;
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property '${property}'`);
    return property in target ? target[property] : `Property ${property} does not exist`;
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  }
};

const targetObj = { name: "JavaScript", type: "Language" };
const proxy = new Proxy(targetObj, handler);

 
const dataMap = new Map();

 
(async () => {
   
  const endpoints = ['endpoint1', 'endpoint2', 'endpoint3'];
  const requestGen = requestGenerator(endpoints);
  const data = await processRequests(requestGen);
  print('Fetched Data:', data);

   
  data.forEach((item, index) => dataMap.set(endpoints[index], item.data));
  print('Data Map:', dataMap);

   
  print(proxy.name);
  proxy.name = "Advanced JavaScript";
  print(proxy.name);
  print(proxy.nonExistent);
})();
