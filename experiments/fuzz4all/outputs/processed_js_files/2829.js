 

 
const asyncOp = (message, delay) => new Promise((resolve) => setTimeout(() => resolve(message), delay));

 
async function fetchData() {
  const responses = await Promise.all([
    asyncOp('Data 1', 1000),
    asyncOp('Data 2', 500),
    asyncOp('Data 3', 1200),
  ]);
  return responses;
}

 
function* dataGenerator(dataArray) {
  for (const data of dataArray) {
    yield data;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  }
};

(async function main() {
  try {
    const data = await fetchData();
    
     
    const gen = dataGenerator(data);
    
     
    const proxiedGen = new Proxy(gen, handler);

     
    for (const value of proxiedGen) {
      print(`Generated value: ${value}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
