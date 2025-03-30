class DataProcessor {
    #privateData = new WeakMap();

    constructor(data) {
        this.data = data;
        this.#privateData.set(this, this.#deepClone(data));
    }

    #deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    async processData(transformFn) {
        try {
            let transformedData = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    const clonedData = this.#deepClone(this.#privateData.get(this));
                    resolve(transformFn(clonedData));
                }, 1000);
            });
            return transformedData;
        } catch (error) {
            throw new Error('Processing error: ' + error.message);
        }
    }

    static validateData(data) {
        if (!data || typeof data !== 'object') {
            throw new TypeError('Invalid data type');
        }
        return true;
    }

    *[Symbol.iterator]() {
        for (const key of Object.keys(this.data)) {
            yield [key, this.data[key]];
        }
    }
}

 
(async () => {
    const data = { name: 'Alice', age: 30, location: 'Wonderland' };
    DataProcessor.validateData(data);

    const processor = new DataProcessor(data);

    const transformFn = (data) => {
        data.timestamp = new Date();
        return data;
    };

    const result = await processor.processData(transformFn);
    print(result);

    for (const [key, value] of processor) {
        print(key, ':', value);
    }
})();
