 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Sample Data', status: 200 });
      } else {
        reject(new Error('URL not provided'));
      }
    }, 1000);
  });
}

 
async function getData() {
  try {
    const url = 'https://api.example.com/data';
    const { data, status } = await fetchData(url);  
    print(`Status: ${status}, Data: ${data}`);

     
    const additionalData = [1, 2, 3];
    const combinedData = [...data, ...additionalData];
    print('Combined Data:', combinedData);

     
    const processedData = combinedData.map((item, index) => ({ id: index, value: item }));
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

 
(async () => {
  await getData();
})();
