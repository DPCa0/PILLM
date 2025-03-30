 

async function fetchData(urls) {
   
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  
   
  const [data1, data2, data3] = await Promise.all(fetchPromises);

   
  return [...data1, ...data2, ...data3];
}

 
const apiUrls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

 
(async () => {
  try {
    const combinedData = await fetchData(apiUrls);
    
     
    const processedData = combinedData
      .filter(item => item.active)  
      .map(({ id, name }) => ({ id, name }))  
      .reduce((acc, item) => {
        acc[item.id] = item.name;
        return acc;
      }, {});  

    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
