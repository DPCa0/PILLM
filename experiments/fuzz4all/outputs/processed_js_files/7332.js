class AsyncProcessor {
    constructor(data) {
        this.data = data;
    }

    async * processData() {
        for (const item of this.data) {
            await new Promise(res => setTimeout(res, Math.random() * 1000));  
            yield item * 2;
        }
    }
}

const main = async () => {
    const data = [1, 2, 3, 4, 5];
    const processor = new AsyncProcessor(data);

    const resultPromises = [];
    const asyncIterator = processor.processData();

    for (let i = 0; i < data.length; i++) {
        resultPromises.push(asyncIterator.next().then(({ value }) => value));
    }

    const results = await Promise.all(resultPromises);
    print("Processed Results:", results);

    const sum = results.reduce((acc, val) => acc + val, 0);
    print("Sum of Processed Results:", sum);

    const { max, min } = results.reduce((acc, val) => ({
        max: Math.max(acc.max, val),
        min: Math.min(acc.min, val)
    }), { max: Number.NEGATIVE_INFINITY, min: Number.POSITIVE_INFINITY });

    print("Max:", max, "Min:", min);
};

main().catch(console.error);
