 
async function* fetchData(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      yield response.json();
    } catch (error) {
      yield { error: 'Failed to fetch data' };
    }
  }
}

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

const handler = {
  get(target, prop, receiver) {
    if (prop === 'next') {
      print('Fetching next data chunk...');
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxyGenerator = new Proxy(fetchData(urls), handler);

(async function () {
  for await (const data of proxyGenerator) {
    print(data);
  }
})();
