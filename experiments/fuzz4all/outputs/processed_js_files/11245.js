class AsyncResourceLoader {
  constructor(resources) {
    this.resources = resources;
  }

  async *fetchResources() {
    for (let resource of this.resources) {
      yield fetch(resource).then(res => res.json());
    }
  }

  async processResources() {
    const results = [];
    for await (let resource of this.fetchResources()) {
      results.push(this.transformResource(resource));
    }
    return results;
  }

  transformResource(resource) {
    return { id: resource.id, content: resource.content.toUpperCase() };
  }
}

(async () => {
  const resourceURLs = [
    'https://api.example.com/resource1',
    'https://api.example.com/resource2'
  ];
  
  const loader = new AsyncResourceLoader(resourceURLs);
  try {
    const results = await loader.processResources();
    results.forEach(result => {
      print(`Resource ${result.id}: ${result.content}`);
    });
  } catch (error) {
    console.error('Error processing resources:', error);
  }
})();
