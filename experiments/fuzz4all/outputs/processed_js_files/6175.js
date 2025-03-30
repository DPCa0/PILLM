 

 
const MyModule = (() => {
   
  const privateVar = 'This is private!';

   
  const fetchData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve('Fetched Data'), 1000);
    });
  };

   
  function* numberGenerator(start = 0) {
    let number = start;
    while (true) {
      yield number++;
    }
  }

   
  return {
    async getProcessedData() {
       
      const data = await fetchData();
      return `Processed: ${data}`;
    },
    getGenerator() {
       
      return numberGenerator();
    },
  };
})();

 
const { getProcessedData, getGenerator } = MyModule;

 
(async () => {
  const result = await getProcessedData();
  print(result);  

  const gen = getGenerator();
  print(gen.next().value);  
  print(gen.next().value);  
  print(gen.next().value);  
})();
