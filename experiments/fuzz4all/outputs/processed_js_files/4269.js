class DataProcessor {
    #data;
    
    constructor(data) {
        this.#data = data;
    }

    async *processData() {
        for (let item of this.#data) {
            yield new Promise(resolve => setTimeout(() => resolve(item * 2), 100));
        }
    }

    async transformData() {
        const processedData = [];
        for await (let item of this.processData()) {
            processedData.push(item);
        }
        return processedData;
    }
}

const pipeline = new Proxy(new DataProcessor([1, 2, 3, 4]), {
    get: (target, prop, receiver) => {
        if (prop === 'transformData') {
            print('Transforming data...');
        }
        return Reflect.get(target, prop, receiver);
    }
});

(async () => {
    const result = await pipeline.transformData();
    print('Transformed Data:', result);
})();
