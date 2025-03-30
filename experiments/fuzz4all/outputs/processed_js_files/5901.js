class AsyncResourceLoader {
  constructor(resources) {
    this.resources = resources;
  }

  async *fetchResources() {
    for (const resource of this.resources) {
      yield fetch(resource).then((res) => res.text());
    }
  }

  async loadAll() {
    const results = [];
    for await (const data of this.fetchResources()) {
      results.push(data);
    }
    return results;
  }
}

(async () => {
  const loader = new AsyncResourceLoader([
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ]);

  const resources = await loader.loadAll();
  const wordCounts = resources.map((data, index) => ({
    resource: index + 1,
    wordCount: data.split(/\s+/).length
  }));

  console.table(wordCounts);

  const [firstResource, secondResource] = resources;
  const {length: firstLength} = firstResource;
  const {length: secondLength} = secondResource;
  
  print(`First resource length: ${firstLength}`);
  print(`Second resource length: ${secondLength}`);
})();
