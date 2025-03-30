 
import { createHash } from 'crypto';

 
(async () => {
   
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const dataToHash = 'Hello, world!';
  
   
  print(`Data to hash: ${dataToHash}`);
  
   
  async function hashData(data) {
    try {
       
      await wait(500);
      
       
      const hash = createHash('sha256')
        .update(data)
        .digest('hex');
        
       
      print(`Hashed data: ${hash ?? 'Hashing failed!'}`);
    } catch (error) {
      console.error('Error while hashing data:', error);
    }
  }
  
   
  const tasks = [1, 2, 3].map((num) =>
    (async () => {
      await wait(num * 100);
      print(`Task ${num} completed`);
      return num;
    })()
  );
  
   
  await hashData(dataToHash);
  const results = await Promise.all(tasks);
  
   
  const [first, ...rest] = results;
  
   
  const uniqueResults = new Set(results);
  const doubledResultsMap = new Map(uniqueResults).set('doubled', [...uniqueResults].map(x => x * 2));
  
  print(`First result: ${first}, Rest: ${rest}`);
  print(`Unique results: ${[...uniqueResults]}`);
  print(`Doubled results: ${doubledResultsMap.get('doubled')}`);
})();
