 
const delay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000)));

 
const fetchData = async () => {
  const urls = ['https://api1.example.com', 'https://api2.example.com', 'https://api3.example.com'];
  const requests = urls.map(async url => {
    await delay();
    print(`Fetched data from ${url}`);
    return `Data from ${url}`;
  });
  
  return Promise.all(requests);
};

 
const processResults = (results) => {
  const resultMap = new Map();
  const dataSet = new Set(results);
  
  dataSet.forEach(data => {
    const [url] = data.split(' ');
    resultMap.set(url, data);
  });
  
  return resultMap;
};

 
(async () => {
  try {
    const results = await fetchData();
    const processedData = processResults(results);
    
     
    for (const [url, data] of processedData) {
      print(`Processed data from ${url}: ${data}`);
    }
    
     
    print(`Example of advanced JS: Processed data for a non-existing URL: ${processedData.get('https://api4.example.com') ?? 'No data'}`);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
