 

 
const fetchData = async (endpoint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${endpoint}`);
    }, Math.random() * 1000);
  });
};

 
const processEndpoints = async (...endpoints) => {
  try {
     
    const results = await Promise.all(endpoints.map(endpoint => fetchData(endpoint)));

     
    const [firstResult, ...otherResults] = results;

     
    const combinedResults = [firstResult, ...otherResults];

     
    const processedResults = combinedResults.map(result => result.toUpperCase());

    print('Processed Results:', processedResults);

  } catch (error) {
    console.error('Error processing endpoints:', error);
  }
};

 
processEndpoints('/api/data1', '/api/data2', '/api/data3');
