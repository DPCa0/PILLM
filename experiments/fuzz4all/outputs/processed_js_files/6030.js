 

 
const fetchData = (index) => new Promise(resolve => {
  setTimeout(() => {
    resolve(`Data-${index}`);
  }, Math.random() * 1000);
});

 
async function* asyncDataGenerator(count) {
  for (let i = 0; i < count; i++) {
    const data = await fetchData(i);
    yield data;
  }
}

 
const dataHandler = {
  get(target, prop) {
    print(`Accessing ${prop} of the data`);
    return prop in target ? target[prop] : undefined;
  }
};

 
(async () => {
  const dataLimit = 5;
  const dataList = [];

   
  for await (const data of asyncDataGenerator(dataLimit)) {
    print(`Received: ${data}`);
    dataList.push(data);
  }

   
  const proxiedDataList = new Proxy(dataList, dataHandler);

   
  print(proxiedDataList[0]);  
  print(proxiedDataList[4]);  
})();
