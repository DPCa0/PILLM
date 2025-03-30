 
const asyncTask = (value) => new Promise((resolve, reject) => {
  setTimeout(() => value % 2 === 0 ? resolve(value * 2) : reject('Odd number'), 1000);
});

 
(async () => {
   
  const numberMap = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

   
  const processedResults = await Promise.allSettled(Array.from(numberMap.keys()).map(async (key) => {
    try {
      const result = await asyncTask(key);
      return { key, result };
    } catch (error) {
      return { key, error };
    }
  }));

   
  const resultsObject = processedResults.reduce((acc, { key, value, reason }) => {
    acc[numberMap.get(key)] = value ? value.result : reason;
    return acc;
  }, {});

   
  print(`Processed Results: ${JSON.stringify(resultsObject, null, 2)}`);
})();
