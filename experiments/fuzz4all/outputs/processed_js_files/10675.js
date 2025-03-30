 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: `Data from ${url}` }), 1000);
  });
};

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
const fetchAllData = async () => {
  const urls = urlGenerator();
  const promises = [...urls].map((url) => fetchData(url));
  
   
  const [result1, result2, result3] = await Promise.all(promises);

  print('Result 1:', result1.data);
  print('Result 2:', result2.data);
  print('Result 3:', result3.data);
};

 
(async () => {
  print('Fetching data...');
  await fetchAllData();
  print('All data fetched!');
})();
