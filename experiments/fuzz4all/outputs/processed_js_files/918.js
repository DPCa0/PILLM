class AsyncProcessor {
    constructor(data) {
        this.data = data;
    }

    async *asyncGenerator() {
        for (let item of this.data) {
            yield new Promise(resolve => setTimeout(() => resolve(item * 2), 100));
        }
    }

    async processData(callback) {
        const results = [];
        for await (let value of this.asyncGenerator()) {
            results.push(value);
        }
        return callback(results);
    }
}

const myProcessor = new AsyncProcessor([1, 2, 3, 4, 5]);
myProcessor.processData(results => {
    const processedData = results.map((num, index) => ({
        index,
        value: num,
        isEven: num % 2 === 0
    }));

    const proxyHandler = {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            } else {
                return `Property ${prop} is not found`;
            }
        }
    };

    const dataProxy = new Proxy(processedData, proxyHandler);
    print(dataProxy[0]);
    print(dataProxy[5]);  
});
