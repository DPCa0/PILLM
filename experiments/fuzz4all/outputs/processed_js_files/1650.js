 

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Sample Data" }), 1000);
  });
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Set property: ${property} with value: ${value}`);
    target[property] = value;
    return true;
  },
};

(async () => {
  const data = await fetchData();

  const proxyData = new Proxy(data, handler);

   
  const { id, name } = proxyData;

   
  const dataMap = new Map([[id, { ...proxyData }]]);
  const dataSet = new Set([id, ...[2, 3, 4]]);

  print(`Data Name: ${name}`);  
  proxyData.newProperty = "New Value";  

   
  for (const [key, value] of dataMap) {
    print(`Map - Key: ${key}, Value: ${JSON.stringify(value)}`);
  }

  for (const value of dataSet) {
    print(`Set Value: ${value}`);
  }
})();
