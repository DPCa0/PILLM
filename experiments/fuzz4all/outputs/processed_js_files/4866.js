class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async #fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }

  async *fetchWithPagination(page = 1, results = []) {
    const data = await this.#fetchData();
    if (data && data.items && data.items.length > 0) {
      results.push(...data.items);
      yield { page, items: data.items };

      if (data.nextPage) {
        yield* this.fetchWithPagination(data.nextPage, results);
      } else {
        print('All data fetched:', results);
      }
    }
  }
}

(async () => {
  const url = 'https://api.example.com/data';
  const dataFetcher = new DataFetcher(url);

  for await (const page of dataFetcher.fetchWithPagination()) {
    print('Fetched page:', page.page, 'Items:', page.items.length);
  }
})();
