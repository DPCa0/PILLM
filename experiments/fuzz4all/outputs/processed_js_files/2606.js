 
class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }

  static async withTimeout(ms, promise) {
    let timeout;
    const timeoutPromise = new Promise((_, reject) => {
      timeout = setTimeout(() => reject(new Error('Timeout')), ms);
    });
    return Promise.race([timeoutPromise, promise]).finally(() => clearTimeout(timeout));
  }
}

const processResults = async (data) => {
  if (!Array.isArray(data)) throw new TypeError('Expected an array');
  return data.map((item) => ({ ...item, processed: true }));
};

const main = async () => {
  const api = new DataFetcher('https://jsonplaceholder.typicode.com');
  try {
    const rawData = await DataFetcher.withTimeout(
      5000,
      api.fetchData('posts')
    );
    const results = await processResults(rawData);
    print('Processed Results:', results);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

main();
