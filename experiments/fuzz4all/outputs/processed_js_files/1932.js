 
const fetchData = async (url) => {
   
  const simulateFetch = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        'https://api.example.com/data1': { value: 42 },
        'https://api.example.com/data2': { value: 84 }
      };
      if (data[url]) resolve(data[url]);
      else reject(new Error('404 Not Found'));
    }, 1000);
  });

  try {
    const response = await simulateFetch();
    return response.value;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

 
const processData = async () => {
  try {
    const [value1, value2] = await Promise.all([
      fetchData('https://api.example.com/data1'),
      fetchData('https://api.example.com/data2')
    ]);

    const results = [value1, value2].map(val => val * 2);
    print(`Processed results: ${results.join(', ')}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  await processData();
})();
