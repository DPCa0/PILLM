 

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

 
async function getData(urls) {
  let results = [];
  for (const url of urls) {
    const data = await fetchData(url);
    results.push(data);
  }
  return results;
}

 
function* dataChunker(dataArray, chunkSize) {
  for (let i = 0; i < dataArray.length; i += chunkSize) {
    yield dataArray.slice(i, i + chunkSize);
  }
}

 
const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} is not available`),
};

 
(async function () {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
  const fetchedData = await getData(urls);

  const proxyData = new Proxy({ apiData: fetchedData }, handler);
  print(proxyData.apiData);

  const chunkIterator = dataChunker(proxyData.apiData, 2);
  for (const chunk of chunkIterator) {
    print('Chunk:', chunk);
  }

  print(proxyData.nonExistentProperty);  
})();
