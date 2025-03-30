class AsyncDataProcessor {
    constructor(data) {
        this.data = data;
    }

    async processData() {
        const processedData = await Promise.all(
            this.data.map(async (item, index) => {
                return this.#transform(item, index);
            })
        );

        return this.#filterValidData(processedData);
    }

    async #transform(item, index) {
        await this.#simulateNetworkLatency(index);
        return { ...item, processed: true };
    }

    async #simulateNetworkLatency(index) {
        return new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + index * 100));
    }

    * #filterValidData(data) {
        for (const item of data) {
            if (item.processed) yield item;
        }
    }
}

(async () => {
    const rawData = Array.from({ length: 5 }, (_, index) => ({ id: index, value: Math.random() * 100 }));
    const processor = new AsyncDataProcessor(rawData);
    
    for await (const item of processor.processData()) {
        print(item);
    }
})();
