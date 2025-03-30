 

 
function* dataFetcher() {
  yield new Promise((resolve) => setTimeout(() => resolve({ id: 1, name: 'Alice' }), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve({ id: 2, name: 'Bob' }), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve({ id: 3, name: 'Carol' }), 1000));
}

 
async function processData() {
  const dataGen = dataFetcher();
  let result = dataGen.next();
  
  while (!result.done) {
    const data = await result.value;
    const { id, name } = data;  
    print(`Processing data: ID = ${id}, Name = ${name}`);
    result = dataGen.next();
  }
}

 
(async () => {
  print('Starting data processing');
  await processData();
  print('All data processed');
})();
