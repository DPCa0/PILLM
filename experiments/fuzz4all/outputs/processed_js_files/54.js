class AsyncDataHandler {
  constructor(urls) {
    this.urls = urls;
  }

  async *fetchData() {
    for (const url of this.urls) {
      yield fetch(url).then(response => response.json());
    }
  }

  async process() {
    const results = [];
    for await (const dataPromise of this.fetchData()) {
      const data = await dataPromise;
      results.push(this.#transformData(data));
    }
    print(this.#combineResults(results));
  }

  #transformData(data) {
     
    return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join(', ');
  }

  #combineResults(results) {
    return results.join('\n---\n');
  }
}

 
const handler = new AsyncDataHandler(['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/users/1']);
handler.process();
