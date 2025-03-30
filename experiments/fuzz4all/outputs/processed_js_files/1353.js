class AsyncProcess {
    constructor() {
        this.data = new Map();
    }

     
    *processData() {
        for (let i = 0; i < 5; i++) {
            print(`Processing item ${i}...`);
            yield new Promise((resolve) => setTimeout(() => resolve(i * i), 1000));
        }
    }

    async startProcessing() {
        const processIterator = this.processData();
        for await (const processedItem of processIterator) {
            print(`Processed result: ${processedItem}`);
            this.data.set(processedItem, `Result for ${processedItem}`);
        }
    }

     
    createDataProxy() {
        return new Proxy(this.data, {
            get: (target, prop) => {
                if (prop in target) {
                    return target[prop];
                } else {
                    print(`Property ${prop} does not exist`);
                    return 'Property not found';
                }
            },
        });
    }
}

(async () => {
    const process = new AsyncProcess();
    await process.startProcessing();
    const dataProxy = process.createDataProxy();
    print(dataProxy.get(0));  
    print(dataProxy.get(10));  
})();
