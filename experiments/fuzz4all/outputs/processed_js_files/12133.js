 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async (url) => {
  await delay(Math.random() * 1000);
  return `Data from ${url}`;
};

 
function* urlGenerator() {
  yield 'https://api.example.com/data1';
  yield 'https://api.example.com/data2';
  yield 'https://api.example.com/data3';
}

 
const handleDataFetching = async (urlGen) => {
  for (let url of urlGen) {
    print(`Fetching from: ${url}`);
    try {
      const data = await fetchData(url);
      print(`Received: ${data}`);
    } catch (error) {
      console.error(`Error fetching from ${url}:`, error);
    }
  }
};

 
(async () => {
  const urlGen = urlGenerator();
  await handleDataFetching(urlGen);
})();
