 

 
const fetchData = (url) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({ data: `Data from ${url}`, status: 200 });
  }, Math.random() * 2000);
});

 
async function getConcurrentData(urls) {
  const results = await Promise.all(urls.map(url => fetchData(url)));
  return results.map(({ data }) => data);
}

 
async function processData() {
  const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];

   
  const rawData = await getConcurrentData(urls);

   
  const uniqueData = new Set(rawData);

   
  const processedData = new Map();
  uniqueData.forEach((data, index) => {
    processedData.set(index, data.toUpperCase());
  });

   
  for (let [id, data] of processedData.entries()) {
    print(`ID: ${id}, Data: ${data}`);
  }
}

 
processData();
