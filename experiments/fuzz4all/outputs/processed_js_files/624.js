 
const fetchData = (url, delay) => new Promise(resolve => setTimeout(() => {
  resolve(`Data from ${url}`);
}, delay));

async function* asyncDataGenerator(urls) {
  for (const url of urls) {
    yield await fetchData(url.url, url.delay);
  }
}

async function processData(urls) {
  const results = [];
  const iterator = asyncDataGenerator(urls);

  for await (const data of iterator) {
    results.push(data);
  }

  return results;
}

const urls = [
  { url: 'https://api.example.com/data1', delay: 1000 },
  { url: 'https://api.example.com/data2', delay: 2000 },
  { url: 'https://api.example.com/data3', delay: 1500 },
];

const handleResults = async () => {
  const settledPromises = await Promise.allSettled(urls.map(url => fetchData(url.url, url.delay)));
  const fulfilledResults = settledPromises.filter(result => result.status === 'fulfilled').map(result => result.value);

  print('Promises settled:', settledPromises);
  print('Fulfilled Results:', fulfilledResults);

  const processedData = await processData(urls);
  print('Processed Data:', processedData);
};

handleResults();
