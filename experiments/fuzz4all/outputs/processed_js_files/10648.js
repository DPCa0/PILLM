class AsyncProcessor {
    constructor(data) {
        this.data = data;
    }

    async *generateNumbers() {
        for (let i = 0; i < this.data.length; i++) {
             
            await new Promise(resolve => setTimeout(resolve, 100));
            yield this.data[i] * 2;
        }
    }

    async process() {
        const results = [];
        for await (let number of this.generateNumbers()) {
            results.push(number);
        }
        return results;
    }
}

const dataProxyHandler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        }
        throw new Error(`Property "${property}" not found`);
    },
    set(target, property, value) {
        if (typeof value !== 'number') {
            throw new TypeError('Values must be numbers');
        }
        target[property] = value;
        return true;
    }
};

const rawData = new Proxy([1, 2, 3, 4, 5], dataProxyHandler);

(async () => {
    try {
        const processor = new AsyncProcessor(rawData);
        const processedData = await processor.process();
        print(processedData);
    } catch (error) {
        console.error(error.message);
    }
})();
