class AsyncResourceLoader {
  constructor(resources) {
    this.resources = resources;
  }

  loadResources() {
    return Promise.all(this.resources.map(res => this._fetchResource(res)));
  }

  async _fetchResource(resource) {
    try {
      const response = await fetch(resource);
      const data = await response.json();
      return { [resource]: data };
    } catch (error) {
      return { [resource]: { error: error.message } };
    }
  }
}

const resources = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://invalid-url.com/data'
];

(async () => {
  const loader = new AsyncResourceLoader(resources);
  const results = await loader.loadResources();
  
  results.forEach(result => {
    const [[resource, data]] = Object.entries(result);
    print(`Resource: ${resource}`);
    console.table(data);
  });
})();
