 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data loaded');
    }, 1000);
  });
};

 
function* dataGenerator() {
  yield fetchData();
  yield fetchData();
  yield fetchData();
}

 
async function processData() {
  const generator = dataGenerator();
  for (let promise of generator) {
    const result = await promise;
    print(result);
  }
}

 
async function runComplexAsyncFlow() {
  try {
    const promises = [fetchData(), fetchData(), fetchData()];

     
    const results = await Promise.allSettled(promises);

     
    const { format } = await import('date-fns');

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        print(`Promise ${index + 1} resolved: ${result.value}`);
      } else {
        console.error(`Promise ${index + 1} rejected: ${result.reason}`);
      }
    });

    print(`Process completed at: ${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
processData().then(() => runComplexAsyncFlow());
