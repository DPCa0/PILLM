 

 

 
function simulateApiCall(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve(`Processed: ${data}`) : reject("Error: API call failed");
    }, 1000);
  });
}

 
function* dataGenerator(dataArray) {
  for (let data of dataArray) {
    yield data;
  }
}

 
async function processData(generator) {
  let resultMap = new Map();
  for (let data of generator) {
    try {
      const result = await simulateApiCall(data);
      resultMap.set(data, result);
    } catch (error) {
      console.error(error);
    }
  }
  return resultMap;
}

 
const mapHandler = {
  get: (target, property) => {
    print(`Accessing property '${property}'`);
    return target[property];
  },
};

 
const sampleData = ['data1', 'data2', 'data3', 'data4', 'data5'];

 
const dataGen = dataGenerator(sampleData);

 
processData(dataGen).then((resultMap) => {
  const proxyMap = new Proxy(resultMap, mapHandler);
  print(proxyMap.get('data1'));   
  print(proxyMap.get('data2'));   
});
