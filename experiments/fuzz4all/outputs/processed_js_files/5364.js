 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.2 ? resolve(`Data from ${url}`) : reject('Fetch error');
    }, 1000);
  });
}

 
async function processData() {
  const urls = ['api/data1', 'api/data2', 'api/data3'];

  try {
     
    const results = await Promise.all(urls.map(url => fetchData(url)));
     
    const [data1, data2, data3] = results;

     
    console.log(`
      Fetched Data:
      - Data1: ${data1}
      - Data2: ${data2}
      - Data3: ${data3}
    `);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const config = { apiEndpoint: 'https://api.example.com', timeout: null };
  print('API Endpoint:', config.apiEndpoint?.toUpperCase() ?? 'Not defined');
  print('Timeout:', config.timeout ?? 3000);
}

 
(async () => {
  await processData();
})();
