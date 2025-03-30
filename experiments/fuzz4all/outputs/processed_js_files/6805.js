class AsyncResourceManager {
    constructor(resources) {
        this.resources = resources;
    }

    async *[Symbol.asyncIterator]() {
        for (const resource of this.resources) {
            yield await this.fetchResource(resource);
        }
    }

    async fetchResource(url) {
        const delay = Math.floor(Math.random() * 2000) + 500;  
        await new Promise(resolve => setTimeout(resolve, delay));  
        return `Resource: ${url} fetched in ${delay}ms`;
    }
}

const resources = [
    "https://example.com/api/resource1",
    "https://example.com/api/resource2",
    "https://example.com/api/resource3"
];

(async () => {
    const manager = new AsyncResourceManager(resources);
    const fetchedResources = [];
    
    for await (const result of manager) {
        print(result);
        fetchedResources.push(result);
    }

    const transformedResults = fetchedResources
        .map(res => res.toUpperCase())
        .filter(res => res.includes('RESOURCE'));

    print('Transformed Results:', transformedResults);
})();
