 
 

 
const fetchData = () => new Promise((resolve) => setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000));

 
function* processData(data) {
  for (let item of data) {
    yield item * 2;
  }
}

 
async function getProcessedData() {
  const data = await fetchData();
  const processedData = [];
  const generator = processData(data);

  for (let value of generator) {
    processedData.push(value);
  }
  return processedData;
}

 
const dataHandler = {
  get: (target, prop) => {
    print(`Accessing property "${prop}"`);
    return target[prop];
  }
};

(async () => {
  const rawData = await getProcessedData();
  const proxiedData = new Proxy(rawData, dataHandler);

   
  print(proxiedData[0]);   
  print(proxiedData[1]);   
  print(proxiedData.length);  
})();
