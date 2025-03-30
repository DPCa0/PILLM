 
const advancedFeatureDemo = (() => {
   
  let privateCounter = 0;

   
  const delay = ms => new Promise(res => setTimeout(res, ms));

   
  const fetchData = async () => {
     
    const { JSONPlaceholder } = await import('https://jsonplaceholder.typicode.com/posts');
    return JSONPlaceholder ? JSONPlaceholder : [];
  };

   
  const asyncIncrement = async () => {
    await delay(1000);  
    privateCounter++;
    print(`Counter incremented to: ${privateCounter}`);
  };

   
  return {
    getCounter: () => privateCounter,
    increment: asyncIncrement,
    fetchData
  };
})();

 
(async () => {
  print(`Initial Counter: ${advancedFeatureDemo.getCounter()}`);
  await advancedFeatureDemo.increment();  
  const data = await advancedFeatureDemo.fetchData();
  print('Fetched Data:', data);
})();
