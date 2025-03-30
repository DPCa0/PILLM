 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(...urls) {
  const results = await Promise.all(urls.map(async url => {
    await delay(1000);  
    return { url, data: `Data from ${url}` };
  }));
  
   
  const [{ url: firstUrl, data: firstData }, ...rest] = results;
  
  print(`First fetched: ${firstData}`);
  return rest.map(({ data }) => data);
}

 
function* dataGenerator(dataArray) {
  for (const data of dataArray) {
    yield data.toUpperCase();
  }
}

 
(async () => {
  const urls = ['https://api.example1.com', 'https://api.example2.com', 'https://api.example3.com'];
  
   
  const remainingData = await fetchData(...urls);
  print(`Remaining data: ${remainingData}`);
  
   
  const generator = dataGenerator(remainingData);
  for (let data of generator) {
    print(`Generated: ${data}`);
  }
})();
