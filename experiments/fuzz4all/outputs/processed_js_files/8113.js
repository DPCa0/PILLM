class AsyncPool {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.queue = [];
    this.activeCount = 0;
  }

  async run(task) {
    if (this.activeCount >= this.maxConcurrency) {
      await new Promise((resolve) => this.queue.push(resolve));
    }
    this.activeCount++;
    try {
      const result = await task();
      return result;
    } finally {
      this.activeCount--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next();
      }
    }
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching data from ${url}`);
  return await response.json();
}

(async () => {
  const pool = new AsyncPool(3);
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3',
    'https://api.example.com/data4',
  ];
  
  const results = await Promise.all(urls.map(url => pool.run(() => fetchData(url))));
  print(results);
})().catch(error => console.error(error));
