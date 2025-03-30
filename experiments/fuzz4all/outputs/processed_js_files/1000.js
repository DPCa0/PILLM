 
const delay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

 
const fetchData = async () => {
  const urls = ['https://api1.example.com/data', 'https://api2.example.com/data'];

   
  const fetchPromises = urls.map(url => delay().then(() => ({ url, data: `Data from ${url}` })));

   
  const results = await Promise.all(fetchPromises);
  print('Fetched data:', results);
};

 
(async () => {
   
  const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
  
   
  for (const [key, value] of map) {
    print(`Map Entry - Key: ${key}, Value: ${value}`);
  }
  
   
  const sum = (...numbers) => numbers.reduce((acc, num) => acc + num, 0);
  print('Sum:', sum(1, 2, 3, 4, 5));
  
   
  await fetchData();
})();
