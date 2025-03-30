class DataFetcher {
  #cache = new Map();

  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    if (this.#cache.has(endpoint)) {
      return this.#cache.get(endpoint);
    }
    const response = await fetch(`${this.apiUrl}/${endpoint}`);
    const data = await response.json();
    this.#cache.set(endpoint, data);
    return data;
  }
}

const withRetry = (fn, retries = 3) => async (...args) => {
  let error;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn(...args);
    } catch (err) {
      error = err;
    }
  }
  throw error;
};

const apiFetch = withRetry(async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
});

const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com');

(async () => {
  try {
    const data1 = await fetcher.fetchData('todos/1');
    print('Data 1:', data1);

    const data2 = await apiFetch('https://jsonplaceholder.typicode.com/todos/2');
    print('Data 2:', data2);
  } catch (error) {
    console.error('Error:', error);
  }
})();
