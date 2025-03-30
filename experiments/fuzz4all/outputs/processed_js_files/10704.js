class AsyncResourceLoader {
  constructor(resources) {
    this.resources = resources;
  }

  async loadResource(resource) {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    print(`Loading resource: ${resource}`);
    await delay(Math.random() * 2000);
    print(`Resource loaded: ${resource}`);
  }

  async *loadAllResources() {
    for (const resource of this.resources) {
      yield this.loadResource(resource);
    }
  }

  async load() {
    const allLoads = [];
    for await (const loadPromise of this.loadAllResources()) {
      allLoads.push(loadPromise);
    }
    await Promise.all(allLoads);
    print('All resources loaded.');
  }
}

const resources = ['image.png', 'data.json', 'script.js', 'style.css'];

(async () => {
  try {
    const loader = new AsyncResourceLoader(resources);
    await loader.load();
  } catch (error) {
    console.error(`Error loading resources: ${error}`);
  }
})();
