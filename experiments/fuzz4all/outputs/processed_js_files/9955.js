class Observable {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify(data) {
    this.listeners.forEach(callback => callback(data));
  }
}

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(`Data from ${url}`);
      } else {
        reject(`Error fetching data from ${url}`);
      }
    }, 1000);
  });
}

async function* fetchWithRetry(urls, maxRetries = 3) {
  for (const url of urls) {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        const data = await fetchData(url);
        yield { url, data };
        break;
      } catch (error) {
        attempts++;
        if (attempts >= maxRetries) {
          yield { url, error };
        }
      }
    }
  }
}

(async () => {
  const urls = ['http://example.com/1', 'http://example.com/2', 'http://example.com/3'];
  const observable = new Observable();

  const unsubscribe = observable.subscribe(result => {
    print(result);
  });

  for await (const result of fetchWithRetry(urls)) {
    observable.notify(result);
  }

  unsubscribe();
})();
