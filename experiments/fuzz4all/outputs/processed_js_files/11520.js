 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        'https://api.example.com/data': { id: 1, value: 'Sample Data' },
      };
      data[url] ? resolve(data[url]) : reject('URL not found');
    }, 1000);
  });
};

 
function* dataGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url).catch((err) => ({ error: err }));
  }
}

 
async function processUrls(urls) {
  const gen = dataGenerator(urls);
  for (const url of urls) {
    const { value, done } = gen.next();
    if (done) break;
    try {
      const result = await value;
      if (result.error) {
        console.error(`Failed to fetch: ${result.error}`);
      } else {
        print('Fetched data:', result);
      }
    } catch (error) {
      console.error('Error processing URL:', error);
    }
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  },
};

 
const sampleData = { apiUrl: 'https://api.example.com/data', otherKey: 'value' };

 
const proxyData = new Proxy(sampleData, handler);

 
processUrls([proxyData.apiUrl, 'https://api.nonexistent.com/data']);
