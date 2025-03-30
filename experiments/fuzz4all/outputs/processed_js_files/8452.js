 
async function* fetchData(urls) {
  for (const url of urls) {
    yield new Promise((resolve) =>
      setTimeout(() => resolve(`Data from ${url}`), Math.random() * 1000)
    );
  }
}

 
const createLogger = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessing property: ${prop}`);
      return obj[prop];
    },
  });
};

 
async function processUrls(urls) {
  const fetchPromises = [];
  const logger = createLogger({ urlsProcessed: 0n });

  for await (const dataPromise of fetchData(urls)) {
    fetchPromises.push(dataPromise);
  }

  const results = await Promise.allSettled(fetchPromises);
  
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      print(result.value);
      logger.urlsProcessed += 1n;
    } else {
      console.error(`Failed to fetch data: ${result.reason}`);
    }
  });

  print(`Total URLs processed: ${logger.urlsProcessed.toString()}`);
}

 
const urls = new Map([
  ["https://api.example.com/1", 1],
  ["https://api.example.com/2", 2],
  ["https://api.example.com/3", 3],
]);

 
const sortedUrls = [...urls.entries()]
  .sort((a, b) => a[1] - b[1])
  .map(([url]) => url);

 
processUrls(sortedUrls);
