 

 
const uniqueKey = Symbol('unique');

 
async function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3;  
      success ? resolve('Data fetched successfully!') : reject('Error fetching data.');
    }, 1000);
  });
}

 
function* dataProcessor(data) {
  yield `Processing ${data}...`;
  yield `Processed ${data}!`;
}

 
const handler = {
  get(target, prop, receiver) {
    if (prop === uniqueKey) {
      return () => [...target];
    }
    return Reflect.get(target, prop, receiver);
  }
};

(async () => {
  try {
    const data = await fetchData();
    const processor = dataProcessor(data);

     
    const proxyProcessor = new Proxy(processor, handler);

    print(proxyProcessor.next().value);  
    print(proxyProcessor.next().value);  

     
    const allSteps = proxyProcessor[uniqueKey]();
    print('All Steps:', allSteps);
  } catch (error) {
    console.error(error);
  }
})();
