 

 
const fetchData = (url) => new Promise((resolve) => {
  setTimeout(() => resolve(`${url} data`), 1000);
});

 
async function getAllData() {
  const urls = ['https://api.example.com/resource1', 'https://api.example.com/resource2', 'https://api.example.com/resource3'];

   
  const promises = urls.map(url => fetchData(url));
  const results = await Promise.all(promises);

   
  const [data1, data2, ...rest] = results;
  print('Data 1:', data1);
  print('Data 2:', data2);
  print('Rest:', rest);

   
  const combineData = (...dataArray) => dataArray.join(' | ');
  const combinedData = combineData(data1, data2, ...rest);

   
  return combinedData;
}

 
(async () => {
  const combinedData = await getAllData();
  print('Combined Data:', combinedData);
})();
