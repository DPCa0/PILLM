 

 
const simulateAsyncOperation = (data, delay) => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

 
const processData = async () => {
  try {
     
    const fetchedData = await simulateAsyncOperation([1, 2, 3, 4, 5], 1000);

     
    const processedData = fetchedData
      .map(num => num * 2)  
      .filter(num => num > 5)  
      .reduce((acc, num) => acc + num, 0);  

    print(`Processed Data Sum: ${processedData}`);  
  } catch (error) {
    console.error(`Error processing data: ${error}`);
  }
};

 
(async () => {
  print('Starting data processing...');
  await processData();
  print('Data processing complete.');
})();
