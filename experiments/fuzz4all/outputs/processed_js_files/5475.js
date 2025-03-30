class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const deferred = new Deferred();

  const timeoutId = setTimeout(() => {
    controller.abort();
    deferred.reject(new Error('Request timed out'));
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
    deferred.resolve(response);
  } catch (error) {
    deferred.reject(error);
  }

  return deferred.promise;
};

const fetchData = async () => {
  try {
    const data = await fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1');
    const json = await data.json();
    print(json);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

fetchData();
