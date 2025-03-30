 

 
function asyncOperation(value, delay) {
  return new Promise(resolve => setTimeout(() => resolve(value), delay));
}

 
function* generatePromises() {
  yield asyncOperation(10, 1000);
  yield asyncOperation(20, 2000);
  yield asyncOperation(30, 1000);
}

 
async function processGenerator(gen) {
  const results = [];
  for (const promise of gen) {
    const result = await promise;
    results.push(result);
  }
  return results;
}

 
async function main() {
  const gen = generatePromises();
  const results = await processGenerator(gen);
  print(`Processed values: ${results.join(', ')}`);
}

main().catch(console.error);
