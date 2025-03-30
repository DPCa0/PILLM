 

const fetchData = async (urls) => {
  try {
     
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    
     
    const results = await Promise.all(promises);
    
     
    const [data1, data2, data3] = results;

     
    const combinedData = new Set([...data1.items, ...data2.items, ...data3.items]);
    
     
    const transformedData = [...combinedData].map(item => ({
      ...item,
      importantValue: item.value * 2  
    }));
    
    print('Transformed Data:', transformedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchData([
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
]);
