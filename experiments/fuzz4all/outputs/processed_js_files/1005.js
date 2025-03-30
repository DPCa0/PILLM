 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
function* urlGenerator() {
  yield "https://api.example.com/data1";
  yield "https://api.example.com/data2";
  yield "https://api.example.com/data3";
}

 
const dataHandler = {
  get: (target, prop) => {
    print(`Accessing ${prop}: ${target[prop]}`);
    return target[prop];
  },
};

 
async function processData() {
  const urls = urlGenerator();
  const fetchedData = {};
  
  for (let url of urls) {
    const data = await fetchData(url);
    const resourceName = url.split('/').pop();
    fetchedData[resourceName] = data;
  }
  
  const proxiedData = new Proxy(fetchedData, dataHandler);
  
   
  print(proxiedData.data1);
  print(proxiedData.data2);
  print(proxiedData.data3);
}

 
processData().catch(console.error);
