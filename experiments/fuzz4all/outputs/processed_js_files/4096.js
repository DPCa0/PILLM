class DataFetcher {
  #dataCache = new WeakMap();

  constructor(url) {
    this.url = url;
  }

  async #fetchData() {
    if (this.#dataCache.has(this.url)) {
      return this.#dataCache.get(this.url);
    }
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    this.#dataCache.set(this.url, data);
    return data;
  }

  async getData() {
    try {
      return await this.#fetchData();
    } catch (error) {
      console.error('Fetching data failed:', error);
    }
  }
}

function* randomGenerator(max = 100) {
  while (true) {
    yield Math.floor(Math.random() * max);
  }
}

async function processData() {
  const dataFetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
  const data = await dataFetcher.getData();
  const randomGen = randomGenerator();
  if (data) {
    for (const item of data) {
      print(`Post ID: ${item.id}, Random Number: ${randomGen.next().value}`);
    }
  }
}

processData();
