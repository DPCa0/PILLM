 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
(async () => {
  const urls = ['https://api.example.com/endpoint1', 'https://api.example.com/endpoint2'];

   
  const dataPromises = urls.map(url => fetchData(url));
  const results = await Promise.all(dataPromises);

   
  const [firstResult, ...restResults] = results;

   
  print(firstResult ?? 'No data for first result');
  print(restResults?.[0] ?? 'No additional data');

   
  print(`Fetched ${results.length} sets of data: ${results.join(', ')}`);

   
  const responseData = {
    [`response_${new Date().getTime()}`]: results,
    timestamp: new Date().toISOString()
  };

  print(responseData);
})();
