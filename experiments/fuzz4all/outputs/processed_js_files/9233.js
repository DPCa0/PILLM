class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    *chunkify(size) {
        for (let i = 0; i < this.data.length; i += size) {
            yield this.data.slice(i, i + size);
        }
    }

    async fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }

    async process() {
        let enrichedData = [];
        for await (const chunk of this.chunkify(3)) {
            const results = await Promise.all(
                chunk.map(async (item) => {
                    const additionalData = await this.fetchData(`https: 
                    return { ...item, ...additionalData };
                })
            );
            enrichedData = enrichedData.concat(results);
        }
        return enrichedData;
    }

    static createMockData(size) {
        return Array.from({ length: size }, (_, i) => ({ id: i + 1, value: Math.random() }));
    }
}

(async () => {
    const data = DataProcessor.createMockData(10);
    const processor = new DataProcessor(data);
    const result = await processor.process();
    print(result);
})();
