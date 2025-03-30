class AsyncSequence {
    constructor(data) {
        this.data = data;
    }

    async *[Symbol.asyncIterator]() {
        for (const item of this.data) {
             
            yield new Promise(resolve => setTimeout(() => resolve(item), 100));
        }
    }

    static async parallelMap(asyncIterable, mapFn) {
        const results = [];
        for await (const item of asyncIterable) {
            results.push(mapFn(item));
        }
        return Promise.all(results);
    }
}

async function run() {
    const sequence = new AsyncSequence([1, 2, 3, 4, 5]);
    const transformedData = await AsyncSequence.parallelMap(sequence, async (num) => {
         
        const result = await new Promise(resolve => setTimeout(() => resolve(num * 2), 100));
        return `Transformed: ${result}`;
    });

    print(transformedData);
}

run().catch(console.error);
