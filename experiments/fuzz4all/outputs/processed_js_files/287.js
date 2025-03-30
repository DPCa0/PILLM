 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));

 
async function* dataGenerator() {
  for (let i = 0; i < 5; i++) {
    const data = await fetchData();
    yield data;
  }
}

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing data: ${prop} = ${target[prop]}`);
      return target[prop];
    } else {
      console.error(`Property ${prop} does not exist.`);
      return undefined;
    }
  }
};

 
(async () => {
  const data = {};
  const proxyData = new Proxy(data, dataHandler);

  for await (const value of dataGenerator()) {
    proxyData[`data_${Object.keys(data).length}`] = value;
  }
  
   
  print(proxyData.data_0);
  print(proxyData.data_4);
  print(proxyData.nonexistent);  
})();
