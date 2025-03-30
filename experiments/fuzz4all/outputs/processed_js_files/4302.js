class AsyncResourceManager {
    constructor(resources) {
        this.resources = resources;
        this.cache = new Map();
    }

    async fetchResource(resourceId) {
        if (this.cache.has(resourceId)) {
            return this.cache.get(resourceId);
        }
        const resource = await new Promise((resolve) =>
            setTimeout(() => resolve(this.resources[resourceId]), 100)
        );
        this.cache.set(resourceId, resource);
        return resource;
    }

    async *resourceGenerator() {
        for (const resourceId in this.resources) {
            yield await this.fetchResource(resourceId);
        }
    }

    async printAllResources() {
        const gen = this.resourceGenerator();
        for await (const resource of gen) {
            print(resource);
        }
    }
}

const resources = {
    1: { name: "Resource 1", value: 100 },
    2: { name: "Resource 2", value: 200 },
    3: { name: "Resource 3", value: 300 }
};

const manager = new AsyncResourceManager(resources);
manager.printAllResources();
