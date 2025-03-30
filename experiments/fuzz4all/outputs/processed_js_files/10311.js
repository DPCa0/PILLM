const fs = require('fs').promises;
const crypto = require('crypto');

 
(async () => {
   
  const readData = async (path) => {
    try {
      const data = await fs.readFile(path, 'utf8');
      return data;
    } catch (err) {
      console.error(`Error reading file from disk: ${err}`);
    }
  };

   
  const generateRandomId = () => crypto.randomBytes(8).toString('hex');

   
  const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  };

   
  const expensiveCalculation = memoize((num) => {
    print(`Calculating for ${num}`);
    return num ** num;
  });

   
  const main = async () => {
    const filePath = './sample.txt';  
    const data = await readData(filePath);
    if (data) {
      print('File Data:', data);
    }

     
    const randomId = generateRandomId();
    print('Generated Random ID:', randomId);

     
    print('Calculation result for 3:', expensiveCalculation(3));
    print('Calculation result for 3 (memoized):', expensiveCalculation(3));
    print('Calculation result for 4:', expensiveCalculation(4));
  };

   
  await main();
})();
