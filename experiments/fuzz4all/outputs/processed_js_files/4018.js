 

 
async function* fetchData(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
const loggerHandler = {
  get(target, property) {
    print(`Accessed property "${property}"`);
    return target[property];
  },
};

 
async function processUrls(urls) {
  const result = [];
  for await (const data of fetchData(urls)) {
    result.push(data);
  }
  return result;
}

 
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
];

 
(async () => {
  const [first, second] = await processUrls(urls);
  const proxyFirst = new Proxy(first, loggerHandler);
  const proxySecond = new Proxy(second, loggerHandler);

  print('First Data:', proxyFirst);
  print('Second Data:', proxySecond);

   
  print('Access title of first:', proxyFirst.title);
  print('Access userId of second:', proxySecond.userId);
})();
