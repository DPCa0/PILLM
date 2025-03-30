 

 
const fetchData = async (url, delay) => {
  await new Promise(resolve => setTimeout(resolve, delay));
  if (Math.random() > 0.7) throw new Error(`Failed to fetch data from ${url}`);
  return { data: `Data from ${url}` };
};

 
const fetchMultipleData = async () => {
  const urls = ['https://api.service1.com', 'https://api.service2.com', 'https://api.service3.com'];

   
  const results = await Promise.allSettled(urls.map(url => fetchData(url, Math.random() * 2000)));

   
  const processedData = results.reduce((acc, result, index) => {
    if (result.status === 'fulfilled') {
      const { data } = result.value;  
      acc.push(data);
    } else {
      console.warn(`Error fetching data from URL at index ${index}: ${result.reason}`);
    }
    return acc;
  }, []);

  print('Processed Data:', processedData);
};

 
fetchMultipleData();
