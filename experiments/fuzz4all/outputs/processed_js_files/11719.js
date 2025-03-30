 
const processItems = ([first, ...rest]) => {
   
  print(`First item: ${first}`);

   
  const uniqueItems = new Set(rest);
  
   
  const uniqueArray = [...uniqueItems];

   
  return new Promise((resolve) => {
    setTimeout(() => {
       
      const results = uniqueArray.map((item) => item * 2);

       
      function* generatorFunction(array) {
        for (const value of array) {
          yield value;
        }
      }

       
      const gen = generatorFunction(results);
      let next = gen.next();
      while (!next.done) {
        print(`Processed item: ${next.value}`);
        next = gen.next();
      }

      resolve('All items processed');
    }, 1000);
  });
};

 
(async () => {
  try {
     
    const message = await processItems([1, 2, 3, 2, 4, 5, 3]);
    print(message);
  } catch (error) {
    console.error('Error processing items:', error);
  }
})();
