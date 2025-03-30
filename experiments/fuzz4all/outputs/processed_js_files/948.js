class AsyncCollection {
    constructor(data) {
        this.data = data;
    }

    async *[Symbol.asyncIterator]() {
        for (let item of this.data) {
            await new Promise(res => setTimeout(res, 100));
            yield item;
        }
    }

    async mapAsync(callback) {
        const result = [];
        for await (let item of this) {
            result.push(callback(item));
        }
        return Promise.all(result);
    }

    async filterAsync(callback) {
        const result = [];
        for await (let item of this) {
            if (callback(item)) result.push(item);
        }
        return result;
    }
}

(async () => {
    const collection = new AsyncCollection([1, 2, 3, 4, 5]);
    
    const squaredValues = await collection.mapAsync(async num => {
        return await new Promise(res => setTimeout(() => res(num * num), 100));
    });

    print('Squared Values:', squaredValues);

    const filteredValues = await collection.filterAsync(num => num % 2 === 0);
    print('Filtered Values:', filteredValues);
})();
