class DataPipeline {
    constructor(data) {
        this.data = data;
    }
    
    async *fetchData() {
        for (let datum of this.data) {
            await new Promise(resolve => setTimeout(resolve, 100));
            yield datum;
        }
    }
    
    transformData(iterator) {
        return {
            [Symbol.asyncIterator]: async function* () {
                for await (let datum of iterator) {
                    yield datum.map(item => item * 2);
                }
            }
        }
    }
    
    async *filterData(iterator, filterFunc) {
        for await (let datum of iterator) {
            if (filterFunc(datum)) {
                yield datum;
            }
        }
    }
    
    reduceData(iterator, reduceFunc, initialValue) {
        return (async () => {
            let accumulator = initialValue;
            for await (let datum of iterator) {
                accumulator = reduceFunc(accumulator, datum);
            }
            return accumulator;
        })();
    }
}

(async () => {
    const pipeline = new DataPipeline([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);

    let iterator = pipeline.fetchData();
    iterator = pipeline.transformData(iterator);
    iterator = pipeline.filterData(iterator, arr => arr.reduce((a, b) => a + b, 0) > 10);
    const result = await pipeline.reduceData(iterator, (acc, val) => acc.concat(val), []);
    
    print(result);
})();
