class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function* fetchData(urls) {
  for (const url of urls) {
    const deferred = new Deferred();
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
      deferred.reject(`Request to ${url} timed out.`);
    }, 5000);

    fetch(url, { signal: controller.signal })
      .then(response => response.json())
      .then(data => {
        clearTimeout(timeout);
        deferred.resolve(data);
      })
      .catch(error => {
        clearTimeout(timeout);
        deferred.reject(`Error fetching ${url}: ${error.message}`);
      });

    yield await deferred.promise;
  }
}

async function parallelFetch(urls, maxConcurrency = 2) {
  const results = [];
  const executing = new Set();

  for (const dataPromise of fetchData(urls)) {
    const promise = dataPromise.then(data => {
      executing.delete(promise);
      return data;
    });
    
    results.push(promise);
    executing.add(promise);

    if (executing.size >= maxConcurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2', 'https://jsonplaceholder.typicode.com/posts/3'];

parallelFetch(urls).then(results => print(results)).catch(error => console.error(error));
