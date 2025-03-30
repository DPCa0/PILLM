class AsyncIterator {
    constructor(data) {
        this.data = data;
    }

    async *[Symbol.asyncIterator]() {
        for (const item of this.data) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            yield item * 2;
        }
    }
}

const complexOperation = async () => {
    const data = [1, 2, 3, 4, 5];
    const iterator = new AsyncIterator(data);

    const transformAndFilter = async () => {
        const result = [];
        for await (const value of iterator) {
            const transformed = value ** 2;
            if (transformed > 10) {
                result.push(transformed);
            }
        }
        return result;
    };

    try {
        const result = await transformAndFilter();
        print(result);
    } catch (error) {
        console.error("Error:", error);
    }
};

complexOperation();
