 

 
const fetchData = async (url) => {
   
  return new Promise((resolve) => setTimeout(() => resolve(`Data from ${url}`), 1000));
};

 
const fetchMultipleSources = async (urls) => {
  try {
     
    const results = await Promise.all(urls.map(url => fetchData(url)));
    print('All data fetched:', results);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const processData = (data) => {
  const uniqueData = new Set(data);
  const dataMap = new Map();

  uniqueData.forEach((item, index) => {
    dataMap.set(index, item);
  });

  print(`Processed Data:\n${Array.from(dataMap).map(([key, value]) => `Index ${key}: ${value}`).join('\n')}`);
};

 
(async () => {
  const urls = ['http://api.site1.com', 'http://api.site2.com', 'http://api.site3.com'];
  const fetchedData = await fetchMultipleSources(urls);
  processData(fetchedData);
})();
