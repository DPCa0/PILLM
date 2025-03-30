 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Fetched data from ${url}`);
      } else {
        reject('No URL provided');
      }
    }, 1000);
  });
};

 
function* fetchGenerator(urls) {
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const proxyHandler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
};

const urls = new Proxy(['https://api.example.com/data1', 'https://api.example.com/data2'], proxyHandler);

 
const executeFetch = async () => {
  const generator = fetchGenerator(urls);
  for (const promise of generator) {
    try {
      const data = await promise;
      print(`Received: ${data}`);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
};

 
print(`Starting fetch operations...`);

executeFetch();
