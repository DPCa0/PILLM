const data = [1, 2, 3, 4, 5];
const asyncProcess = async num => new Promise(resolve => setTimeout(() => resolve(num * num), 100));

const transformData = async () => {
  try {
     
    const results = await Promise.all(data.map(asyncProcess));
    
     
    const handler = {
      get: (target, property) => {
        print(`Accessed property "${property}" with value: ${target[property]}`);
        return target[property];
      }
    };

    const proxiedResults = new Proxy(results, handler);
    
     
    const uniqueResults = new Set(proxiedResults);
    
     
    function* resultGenerator() {
      for (const result of uniqueResults) {
        yield result;
      }
    }

    const gen = resultGenerator();
    
    for (const result of gen) {
      print(`Processed result: ${result}`);
    }
    
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  print('Start Processing...');
  await transformData();
  print('Processing Completed.');
})();
