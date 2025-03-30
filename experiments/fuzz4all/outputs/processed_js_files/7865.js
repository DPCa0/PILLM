 
const { performance } = require('perf_hooks');

 
async function* fetchData(sources) {
  for (const source of sources) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    yield `Data from ${source}`;
  }
}

 
async function processData() {
  const dataSources = ['Server1', 'Server2', 'Server3'];

   
  const start = performance.now();

  const promises = [];
  
   
  for await (const data of fetchData(dataSources)) {
    promises.push(Promise.resolve(data));
  }

   
  const [result1, result2, result3] = await Promise.all(promises);

  const duration = (performance.now() - start).toFixed(2);

   
  console.log(`Results: 
  1. ${result1}
  2. ${result2}
  3. ${result3}
  Processed in ${duration}ms`);
}

processData();
