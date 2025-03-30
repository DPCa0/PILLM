class AsyncCollection {
    constructor(items = []) {
        this.items = items;
    }

    async processItem(item) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(item * 2);
            }, Math.random() * 1000);
        });
    }

    async* asyncGenerator() {
        for (const item of this.items) {
            const processed = await this.processItem(item);
            yield processed;
        }
    }

    async processItemsConcurrently(limit = 2) {
        const results = [];
        const executing = [];

        for (const item of this.items) {
            const p = this.processItem(item).then(result => {
                results.push(result);
                executing.splice(executing.indexOf(p), 1);
            });
            executing.push(p);
            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
        
        await Promise.all(executing);
        return results;
    }
}

(async () => {
    const collection = new AsyncCollection([1, 2, 3, 4, 5]);
    
     
    print('Processing items sequentially with async generator:');
    for await (const result of collection.asyncGenerator()) {
        print(result);
    }

     
    print('\nProcessing items concurrently with limit:');
    const concurrentResults = await collection.processItemsConcurrently(2);
    print(concurrentResults);
})();
