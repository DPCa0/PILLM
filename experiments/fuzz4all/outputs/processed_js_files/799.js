class AsyncResourceManager {
    constructor(resources) {
        this.resources = resources;
    }

    async *[Symbol.asyncIterator]() {
        for (let resource of this.resources) {
            yield this.loadResource(resource);
        }
    }

    async loadResource(resource) {
        return new Promise((resolve) => {
            setTimeout(() => {
                print(`Loaded resource: ${resource}`);
                resolve(resource);
            }, Math.random() * 1000);
        });
    }
}

const resources = ['Resource1', 'Resource2', 'Resource3'];

(async () => {
    const manager = new AsyncResourceManager(resources);

    for await (let loadedResource of manager) {
        print(`Processing ${loadedResource}`);
    }

    const resourcePromises = resources.map(resource => manager.loadResource(resource));
    const loadedResources = await Promise.all(resourcePromises);

    const resourceMap = new Map(loadedResources.map(resource => [resource, { processed: true }]));

    print('Resource Status:');
    resourceMap.forEach((status, resource) => {
        print(`${resource}: ${JSON.stringify(status)}`);
    });
})();
