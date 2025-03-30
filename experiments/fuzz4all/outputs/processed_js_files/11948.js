 

 
const asyncOperation = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

 
function* generatePromises() {
  yield asyncOperation("First", 1000);
  yield asyncOperation("Second", 500);
  yield asyncOperation("Third", 2000);
}

 
async function handleAsyncOperations() {
  const results = [];
  for (const promise of generatePromises()) {
    results.push(await promise);
  }
  return results;
}

 
const dataMap = new Map();
dataMap.set('data', [10, 20, 30]);
dataMap.set('operations', async function() {
  print("Starting async operations...");
  const results = await handleAsyncOperations();
  print("Async operation results:", results);
  return results;
});

(async () => {
  try {
     
    const asyncResults = await dataMap.get('operations')();
    
     
    const transformedData = dataMap.get('data')
      .map(num => num * 2)
      .filter(num => num > 20)
      .reduce((acc, num) => acc + num, 0);
    
    print("Transformed data:", transformedData);
  } catch (error) {
    console.error("Error in processing:", error);
  }
})();
