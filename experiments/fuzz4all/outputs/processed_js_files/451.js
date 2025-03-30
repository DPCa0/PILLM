(async function() {
   

   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'cherry', 'date', 'fig']), 1000);
  });

   
  const processData = async () => {
    const data = await fetchData();
    
     
    const uniqueTransformedData = new Map([...new Set(data)].map(item => [item, item.toUpperCase()]));

     
    const transformedArray = [...uniqueTransformedData.values()];
    return transformedArray;
  };

  const logResult = async () => {
    const result = await processData();
    print(result);   
  };

  logResult();
})();
