 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
async function* fetchUrls(urls) {
  for (const url of urls) {
    yield await fetchData(url);
  }
}

 
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

 
const logWithPrefix = (prefix) => (data) => print(`${prefix} ${data}`);

 
const logAll = (prefix, ...messages) => messages.map(logWithPrefix(prefix));

 
(async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  const results = [];
  
  for await (const data of fetchUrls(urls)) {
    results.push(data);
  }

  const processResults = compose(
    logWithPrefix('INFO:'),
    logAll.bind(null, 'DEBUG:')
  );

  processResults(results);
})();
