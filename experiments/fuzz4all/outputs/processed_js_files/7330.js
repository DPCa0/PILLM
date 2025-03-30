 

 
const fetchData = (endpoint) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.2) {
      resolve(`Data from ${endpoint}`);
    } else {
      reject(`Error fetching ${endpoint}`);
    }
  }, 1000);
});

 
function* endpointGenerator() {
  yield 'api/endpoint1';
  yield 'api/endpoint2';
  yield 'api/endpoint3';
  yield 'api/endpoint4';
}

 
async function processEndpoints() {
  const endpoints = endpointGenerator();
  const results = new Map();

  for (let endpoint of endpoints) {
    try {
      const data = await fetchData(endpoint);
      results.set(endpoint, data);
    } catch (error) {
      console.error(error);
    }
  }

  return results;
}

 
(async () => {
  const dataMap = await processEndpoints();
  
   
  const uniqueData = new Set(dataMap.values());

  print("Fetched Data:", uniqueData);
})();
