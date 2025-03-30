 

 
function* dataStream() {
  yield { id: 1, name: "Alpha" };
  yield { id: 2, name: "Beta" };
  yield { id: 3, name: "Gamma" };
}

 
async function processData(generator) {
  const processedData = [];
  for (let data of generator) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    processedData.push({ ...data, processed: true });
  }
  return processedData;
}

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    return Reflect.set(target, property, value);
  }
};

(async () => {
  const dataGen = dataStream();
  const rawData = await processData(dataGen);

   
  const proxiedData = rawData.map(item => new Proxy(item, handler));

   
  print(proxiedData[0].name);
  proxiedData[1].name = "Delta";

  print("Final Data:", proxiedData);
})();
