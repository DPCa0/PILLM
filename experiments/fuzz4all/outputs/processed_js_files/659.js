class FetchWithRetry {
  constructor(url, options = {}, retries = 3, backoff = 300) {
    this.url = url;
    this.options = options;
    this.retries = retries;
    this.backoff = backoff;
  }

  async fetchWithTimeout(timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(this.url, { ...this.options, signal: controller.signal });
    clearTimeout(id);
    return response;
  }

  async fetchData() {
    for (let i = 0; i < this.retries; i++) {
      try {
        const response = await this.fetchWithTimeout();
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
      } catch (error) {
        if (i < this.retries - 1) {
          await this.delay(this.backoff * (i + 1));
        } else {
          throw new Error(`Failed after ${this.retries} retries: ${error.message}`);
        }
      }
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const fetcher = new FetchWithRetry(url, {}, 5, 500);
    const data = await fetcher.fetchData();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

main();
