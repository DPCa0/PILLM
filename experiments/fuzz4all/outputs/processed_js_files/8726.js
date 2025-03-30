 
const appModule = (() => {
  const data = [1, 2, 3, 4, 5];

   
  const processData = async () => {
    try {
       
      const fetchedData = await new Promise((resolve) => 
        setTimeout(() => resolve([6, 7, 8]), 1000)
      );

      const combinedData = [...data, ...fetchedData];

       
      const [first, ...rest] = combinedData.map((num) => num * 2);

       
      const result = {
        [`num_${first}`]: first,
        ...rest.reduce((acc, curr, index) => ({ ...acc, [`num_${index + 1}`]: curr }), {}),
      };

       
      logOutput`Processed Result: ${JSON.stringify(result, null, 2)}`;
    } catch (error) {
      console.error('Error processing data:', error);
    }
  };

   
  const logOutput = (strings, ...values) => {
    print(strings.raw[0], ...values);
  };

  return { processData };
})();

 
appModule.processData();
