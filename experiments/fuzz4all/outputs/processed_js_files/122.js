 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(`Data from ${url}`);
    } else {
      reject(`Failed to fetch data from ${url}`);
    }
  }, 1000);
});

 
function* dataFetcher(urls) {
  for (let url of urls) {
    yield fetchData(url);
  }
}

 
async function processData(urls) {
  const generator = dataFetcher(urls);
  const results = [];
  
  for (let promise of generator) {
    try {
      const data = await promise;
      results.push(data);
    } catch (error) {
      results.push(error);
    }
  }

  return results;
}

 
const urls = ["https://api.example.com/data1", "https://api.example.com/data2", "https://api.example.com/data3"];

processData(urls).then((results) => {
  const [first, ...rest] = results;  
  print("First result:", first);
  print("Other results:", rest);
});
