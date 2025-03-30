 

class AsyncProcessor {
    constructor(data) {
        this.data = data;
        this.results = new Map();
    }

    async processData() {
        const promises = this.data.map(async (item, index) => {
            const result = await this.delayedCalculation(item);
            this.results.set(index, result);
        });

        await Promise.all(promises);
    }

    delayedCalculation(value) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(value * 2);
            }, 1000);
        });
    }

    *resultGenerator() {
        for (const [key, value] of this.results) {
            yield `Result ${key}: ${value}`;
        }
    }
}

(async () => {
    const data = [1, 2, 3, 4, 5];
    const processor = new AsyncProcessor(data);
    
    await processor.processData();
    
    for (const result of processor.resultGenerator()) {
        print(result);
    }
})();
