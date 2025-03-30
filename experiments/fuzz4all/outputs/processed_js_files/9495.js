class DataProcessor {
    constructor(data) {
        this.data = data;
    }

     
    *transformData() {
        for (let item of this.data) {
            yield this.complexTransformation(item);
        }
    }

    complexTransformation(item) {
         
        let { value, factor } = item;
        return value ** factor + Math.sin(value);
    }

     
    async processAsync() {
        const transformedData = [];
        for await (let transformedItem of this.generateAsyncResults()) {
            transformedData.push(transformedItem);
        }
        return transformedData;
    }

     
    async *generateAsyncResults() {
        for (let transformed of this.transformData()) {
            await this.simulateAsyncDelay();
            yield transformed;
        }
    }

    simulateAsyncDelay() {
        return new Promise(resolve => setTimeout(resolve, Math.random() * 500));
    }
}

 
const sampleData = [
    { value: 2, factor: 3 },
    { value: 4, factor: 2 },
    { value: 5, factor: 1 },
];

 
(async () => {
    const processor = new DataProcessor(sampleData);
    print("Processing asynchronously...");
    const results = await processor.processAsync();
    print("Processed results:", results);
})();
