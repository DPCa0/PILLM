 
const fetchData = async (urls) => {
  const dataFetchPromises = urls.map(url => fetch(url).then(res => res.json()));

  const rawData = await Promise.all(dataFetchPromises);
  
   
  const uniqueData = [...new Set(rawData.map(data => JSON.stringify(data)))].map(data => JSON.parse(data));
  
   
  return uniqueData.map(({ id, name, details }) => {
    const { description, tags } = details;
    return { id, name, description, tags: new Set(tags) };
  });
};

 
(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];
  
  try {
    const data = await fetchData(urls);
    print('Processed Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
