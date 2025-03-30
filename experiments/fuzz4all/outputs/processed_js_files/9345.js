class LazyLoader {
    constructor() {
        this.cache = new Map();
    }

    load(resource, loader) {
        if (!this.cache.has(resource)) {
            this.cache.set(resource, loader(resource).catch(e => {
                this.cache.delete(resource);  
                throw e;
            }));
        }
        return this.cache.get(resource);
    }
}

const simulateNetworkRequest = (resource) => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.2 ? resolve(`Data from ${resource}`) : reject(`Failed to load ${resource}`);
    }, 1000);
});

const loader = new LazyLoader();

 
(async () => {
    const resources = ['file1.txt', 'file2.txt', 'file3.txt'];

    await Promise.all(resources.map(async resource => {
        try {
            const data = await loader.load(resource, simulateNetworkRequest);
            print(`Success: ${data}`);
        } catch (error) {
            console.error(error);
        }
    }));

     
    const cachedData = await loader.load('file1.txt', simulateNetworkRequest);
    print(`Cached: ${cachedData}`);
})();
