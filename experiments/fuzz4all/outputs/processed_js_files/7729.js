 

(async function fetchAndProcessData() {
   
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];

   
  const fetchData = url => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url, data: Math.random() * 100 });
    }, 1000 + Math.random() * 2000);
  });

  try {
     
    const dataPromises = urls.map(url => fetchData(url));

     
    const results = await Promise.all(dataPromises);

     
    const processedData = results
      .filter(result => result.data > 50)  
      .map(({ url, data }) => ({ url, transformedData: data * 2 }));  

     
    print('Processed Data:', processedData);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
