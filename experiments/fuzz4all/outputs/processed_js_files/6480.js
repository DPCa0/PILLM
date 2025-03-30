 

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const getDataFromMultipleSources = async (urls) => {
  try {
    const promises = urls.map(fetchData);
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error in fetching multiple sources:', error);
  }
};

 
(async () => {
  const urls = [
    'https://api.exapmle.com/data1',
    'https://api.example.com/data2'
  ];

  const [data1, data2] = await getDataFromMultipleSources(urls);
  const { key1, key2 } = data1 || {};

   
  print(`Fetched Data:\n- Data1 Key1: ${key1}\n- Data2: ${JSON.stringify(data2)}`);
})();
