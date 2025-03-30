 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchData(url) {
  print(`Fetching data from ${url}`);
  await delay(1000);  
  return `Data from ${url}`;
}

 
function* dataFetcher(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function main() {
  const urls = ['https://api.site1.com', 'https://api.site2.com', 'https://api.site3.com'];
  const fetcher = dataFetcher(urls);
  
  for (let promise of fetcher) {
    const data = await promise;  
    print(data);
  }
}

main().catch(err => console.error(err));
