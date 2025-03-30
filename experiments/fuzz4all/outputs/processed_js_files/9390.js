 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
const loggingProxyHandler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
};

 
function* urlGenerator() {
  yield "http://api.example.com/data1";
  yield "http://api.example.com/data2";
  yield "http://api.example.com/data3";
}

 
async function fetchAllData() {
  const dataStore = {
    data: [],
  };
  
  const dataStoreProxy = new Proxy(dataStore, loggingProxyHandler);
  const urlGen = urlGenerator();

  for (const url of urlGen) {
    const data = await fetchData(url);
    dataStoreProxy.data.push(data);
  }

  print("All data fetched:", dataStoreProxy.data);
}

 
fetchAllData().then(() => {
  print("Fetch operation completed.");
});
