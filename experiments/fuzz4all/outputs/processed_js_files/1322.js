class DataFetcher {
  #cache = new Map();

  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchResource(id) {
    if (this.#cache.has(id)) {
      print(`Cache hit for ID: ${id}`);
      return this.#cache.get(id);
    }

    print(`Fetching resource for ID: ${id}`);
    const response = await fetch(`${this.apiEndpoint}/${id}`);
    const data = await response.json();
    
    this.#cache.set(id, data);
    return data;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fetchInChunks(ids, fetcher) {
  for (let i = 0; i < ids.length; i += 2) {
    yield Promise.all(ids.slice(i, i + 2).map(id => fetcher.fetchResource(id)));
    await delay(1000);
  }
}

(async () => {
  const fetcher = new DataFetcher('https://jsonplaceholder.typicode.com/posts');
  const ids = [1, 2, 3, 4, 5, 6];

  for await (const chunk of fetchInChunks(ids, fetcher)) {
    print('Fetched chunk:', chunk);
  }
})();
