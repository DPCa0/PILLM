 

 
function* dataFetcher() {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
  
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), Math.random() * 2000 + 1000);
  });
}

 
async function handleDataFetching() {
  const generator = dataFetcher();
  for (let promise of generator) {
    const data = await promise;   
    print(data);
  }
}

 
(async () => {
  try {
    await handleDataFetching();
    print('All data fetched!');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
