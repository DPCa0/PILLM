class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

const dataCache = new Proxy({}, {
  get(target, prop) {
    if (!(prop in target)) {
      target[prop] = new Deferred();
      fetchData(prop)
        .then(data => target[prop].resolve(data))
        .catch(error => target[prop].reject(error));
    }
    return target[prop].promise;
  }
});

async function* dataGenerator(urls) {
  for (let url of urls) {
    yield await dataCache[url];
  }
}

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  try {
    for await (let data of dataGenerator(urls)) {
      print(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
