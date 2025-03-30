class DataFetcher {
  #url;
  
  constructor(url) {
    this.#url = url;
  }
  
  async *fetchData(ids) {
    for (const id of ids) {
      try {
        const response = await fetch(`${this.#url}/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        yield data;
      } catch (error) {
        yield { error: error.message };
      }
    }
  }
}

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const ids = [1, 2, 3, 4, 5];
  
  const fetcher = new DataFetcher(url);
  
  const cache = new Map();
  
  const process = async () => {
    for await (const result of fetcher.fetchData(ids)) {
      const { id, title, error } = result;
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        cache.set(id, title);
        print(`Data cached for ID ${id}:`, title);
      }
    }
  };
  
  process().then(() => print('Data processing complete.'));
})();
