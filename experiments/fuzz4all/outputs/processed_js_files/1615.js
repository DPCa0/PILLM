class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const fetchWithTimeout = async (url, timeout = 5000) => {
  const deferred = new Deferred();
  const timer = setTimeout(() => deferred.reject(new Error('Timeout')), timeout);
  
  try {
    const response = await Promise.race([
      fetch(url),
      deferred.promise
    ]);
    clearTimeout(timer);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const getData = async () => {
  try {
    const data = await fetchWithTimeout('https://api.github.com', 3000);
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

const retry = async (fn, retries = 3) => {
  while (retries--) {
    try {
      return await fn();
    } catch (error) {
      if (retries === 0) throw error;
      print('Retrying...');
    }
  }
};

const main = async () => {
  await retry(getData, 3);
};

main();
