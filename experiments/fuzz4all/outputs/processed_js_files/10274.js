class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const signal = controller.signal;
  
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, { signal })
    .finally(() => clearTimeout(timeoutId));
}

async function complexAsyncOperation() {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

  const deferredResults = urls.map(() => new Deferred());

  urls.forEach((url, index) => {
    fetchWithTimeout(url)
      .then(response => response.json())
      .then(data => deferredResults[index].resolve(data))
      .catch(error => deferredResults[index].reject(error));
  });

  try {
    const results = await Promise.all(deferredResults.map(d => d.promise));
    const combinedResult = results.reduce((acc, result) => ({ ...acc, ...result }), {});
    print('Combined Result:', combinedResult);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

complexAsyncOperation();
