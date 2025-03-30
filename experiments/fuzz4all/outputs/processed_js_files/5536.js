class AsyncResourceHandler {
  constructor(resources) {
    this.resources = resources;
  }
  
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async *resourceGenerator() {
    for (const resource of this.resources) {
      yield new Promise(async (resolve) => {
        await AsyncResourceHandler.delay(1000);
        resolve(`Processed ${resource}`);
      });
    }
  }

  async processResources() {
    const results = [];
    for await (const processedResource of this.resourceGenerator()) {
      results.push(processedResource);
    }
    return results;
  }

  [Symbol.iterator]() {
    let index = 0;
    const resources = this.resources;
    return {
      next() {
        if (index < resources.length) {
          return { value: `Resource: ${resources[index++]}`, done: false };
        }
        return { done: true };
      }
    };
  }
}

(async function() {
  const resources = ['Resource1', 'Resource2', 'Resource3'];
  const handler = new AsyncResourceHandler(resources);

  print('Iterating over resources:');
  for (const resource of handler) {
    print(resource);
  }

  print('Processing resources asynchronously:');
  const processedResources = await handler.processResources();
  processedResources.forEach(result => print(result));
})();
