class AsyncIterable {
    constructor(data) {
        this.data = data;
    }

    [Symbol.asyncIterator]() {
        let index = 0;
        const data = this.data;
        return {
            async next() {
                if (index < data.length) {
                     
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return { value: data[index++], done: false };
                }
                return { done: true };
            }
        };
    }
}

async function* transformAsyncIterable(asyncIterable, transformFunc) {
    for await (let item of asyncIterable) {
        yield transformFunc(item);
    }
}

const asyncIterable = new AsyncIterable([1, 2, 3, 4, 5]);

(async () => {
    const transformed = transformAsyncIterable(asyncIterable, x => x * 2);

    for await (let value of transformed) {
        print(value);  
    }
})();
