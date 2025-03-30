 

 
async function fetchDataAndProcess(urls) {
   
  const fetchData = (url) => new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), Math.random() * 1000);
  });

   
  const dataPromises = urls.map(url => fetchData(url));
  const data = await Promise.all(dataPromises);

   
  const uniqueData = Array.from(new Set(data));

   
  const summary = uniqueData.reduce((acc, item) => {
    const key = item.split(' ')[2];  
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

   
  const [keys, values] = [Object.keys(summary), Object.values(summary)];

   
  const resultArray = [...keys, ...values];

   
  return new Promise((resolve) => {
    setTimeout(() => resolve(resultArray), 500);
  });
}

 
const logResults = (prefix = 'Results:', ...results) => {
  print(`${prefix} ${results.join(', ')}`);
};

 
(async () => {
  try {
    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data1'];
    const processedData = await fetchDataAndProcess(urls);
    logResults('Processed Data:', ...processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();
