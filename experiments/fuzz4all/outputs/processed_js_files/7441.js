 

 
function simulateApiCall(data, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

 
async function fetchData(apiData) {
  const data = await simulateApiCall(apiData, 1000);
  return data;
}

 
function* dataGenerator(apis) {
  for (let apiData of apis) {
    yield fetchData(apiData);
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'next') {
      print('Fetching next data...');
    }
    return Reflect.get(...arguments);
  }
};

 
const apiData = ['apiData1', 'apiData2', 'apiData3'];
const generator = dataGenerator(apiData);
const proxiedGenerator = new Proxy(generator, handler);

 
async function handleGenerator(gen) {
  for await (let promise of gen) {
    print(await promise);
  }
}

 
handleGenerator(proxiedGenerator);
