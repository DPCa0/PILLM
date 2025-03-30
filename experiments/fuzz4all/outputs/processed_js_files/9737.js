 
async function fetchData() {
  return new Promise((resolve) => setTimeout(() => resolve('Fetched Data!'), 1000));
}

 
function* dataGenerator() {
  yield fetchData();
  yield 'Synchronous Value';
  yield fetchData();
}

 
async function processGenerator(gen) {
  const results = [];
  for (let val of gen) {
    if (val instanceof Promise) {
      results.push(await val);  
    } else {
      results.push(val);  
    }
  }
  return results;
}

 
(async () => {
  const generator = dataGenerator();
  const data = await processGenerator(generator);
  
   
  const output = data?.join(' - ') ?? 'No data available';
  
   
  const styledLog = (strings, ...values) => {
    const style = 'font-weight: bold; color: green;';
    print('%c' + strings.raw[0], style, ...values);
  };
  
  styledLog`Processed Results: ${output}`;
})();
