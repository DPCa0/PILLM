 

 
function* promiseGenerator() {
  yield new Promise(resolve => setTimeout(() => resolve(1), 1000));
  yield new Promise(resolve => setTimeout(() => resolve(2), 2000));
  yield new Promise(resolve => setTimeout(() => resolve(3), 3000));
}

 
async function processPromises(generator) {
  const results = [];
  for (const promise of generator) {
    results.push(await promise);
  }
  return results;
}

 
(async () => {
  const [first, second, third] = await processPromises(promiseGenerator());
  print(`Results: First - ${first}, Second - ${second}, Third - ${third}`);
})();
