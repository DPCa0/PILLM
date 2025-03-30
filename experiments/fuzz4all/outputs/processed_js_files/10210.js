 
async function* fetchData(urls) {
  for (const url of urls) {
    yield new Promise((resolve) => {
      setTimeout(() => resolve(`Fetched data from ${url}`), 1000);
    });
  }
}

async function processUrls(urls) {
  const handler = {
    get: (target, prop) => {
      if (prop in target) {
        return target[prop];
      } else {
        print(`Property ${prop} does not exist`);
        return null;
      }
    },
  };

  const proxyUrls = new Proxy(urls, handler);

  for await (const data of fetchData(proxyUrls)) {
    print(data);
  }
}

const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3',
];

processUrls(urls).then(() => {
  console.log(`All data processed using:
  - Async/Await
  - Generators
  - Promises
  - Proxies
  - Template Literals`);
});
