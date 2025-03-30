class DataProcessor {
    constructor(data) {
        this.data = data;
    }

    *dataGenerator() {
        for (let item of this.data) {
            yield new Promise((resolve) => {
                setTimeout(() => resolve(item * 2), 1000);
            });
        }
    }

    async processData() {
        const gen = this.dataGenerator();
        for await (let processedItem of gen) {
            print(`Processed: ${processedItem}`);
        }
    }
}

const processDataAsync = async () => {
    const data = [1, 2, 3, 4, 5];
    const processor = new DataProcessor(data);
    await processor.processData();
};

(async () => {
    try {
        await Promise.race([
            processDataAsync(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Process Timeout')), 6000)
            )
        ]);
    } catch (error) {
        console.error(error.message);
    }
})();
