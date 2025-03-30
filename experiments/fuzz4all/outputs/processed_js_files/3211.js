 
const processDataFromAPI = async (url) => {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

     
    let data = await response.json();

     
    const { results } = data;
    if (!Array.isArray(results) || results.length === 0) throw new Error('No results found');

     
    const processedData = results
      .filter(({ status }) => status === 'active')
      .map(({ id, name }) => ({ id, name: name.toUpperCase() }));

    return processedData;
  } catch (error) {
     
    console.error('Error fetching or processing data:', error);
    return [];
  }
};

 
const createLoggingProxy = (target, property) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop === property) {
        print(`Accessed ${property}:`, obj[prop]);
      }
      return obj[prop];
    },
  });
};

 
(async () => {
   
  const apiUrl = 'https://api.example.com/data';
  const data = await processDataFromAPI(apiUrl);
  print('Processed Data:', data);

   
  const user = { id: 1, name: 'Alice', status: 'active' };
  const proxyUser = createLoggingProxy(user, 'name');
  print('User Name:', proxyUser.name);
})();
