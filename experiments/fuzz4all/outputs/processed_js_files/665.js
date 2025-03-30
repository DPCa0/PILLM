 
 

const fetchData = async (urls) => {
   
  const fetchPromises = urls.map(async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}`);
    const data = await response.json();
    return data;
  });

   
  try {
    const results = await Promise.all(fetchPromises);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

 
const processUniqueData = (data) => {
  const processedData = data.flatMap(Object.entries);
  const uniqueEntries = new Set(processedData.map(entry => JSON.stringify(entry)));
  return Array.from(uniqueEntries).map(entry => JSON.parse(entry));
};

 
(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
  ];

  const data = await fetchData(urls);
  const uniqueData = processUniqueData(data);

  print('Unique Processed Data:', uniqueData);
})();
