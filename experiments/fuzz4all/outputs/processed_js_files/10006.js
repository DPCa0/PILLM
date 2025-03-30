class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

async function fetchDataWithRetry(url, retries = 3) {
  while (retries > 0) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn(`Fetch attempt failed: ${error.message}. Retries left: ${retries - 1}`);
      retries--;
      if (retries === 0) throw new Error('Max retries reached');
    }
  }
}

const processData = async (data) => {
  return data.map(item => ({ ...item, timestamp: new Date() }));
}

const applyTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));
  return Promise.race([promise, timeout]);
}

(async () => {
  try {
    const deferred = new Deferred();
    setTimeout(() => deferred.resolve('Deferred resolved!'), 1000);

    const dataPromise = fetchDataWithRetry('https://jsonplaceholder.typicode.com/posts');
    const processedData = await processData(await applyTimeout(dataPromise, 5000));
    print('Processed Data:', processedData);

    print(await deferred.promise);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
