class DataProcessor {
    #data;
    
    constructor(data) {
        this.#data = data;
    }

    *[Symbol.iterator]() {
        for (const item of this.#data) {
            yield this.#processItem(item);
        }
    }

    #processItem(item) {
        return {
            ...item,
            processed: true,
            timestamp: new Date()
        };
    }

    async processData() {
        const results = [];
        for await (const item of this) {
            results.push(item);
        }
        return results;
    }
}

(async () => {
    const data = [
        { id: 1, value: 'apple' },
        { id: 2, value: 'banana' },
        { id: 3, value: 'cherry' }
    ];
    
    const processor = new DataProcessor(data);
    const processedData = await processor.processData();
    
    print('Processed Data:', JSON.stringify(processedData, null, 2));
})();
