class AsyncProcessor {
    constructor(data) {
        this.data = data;
    }

    async *asyncGenerator() {
        for (let item of this.data) {
            yield new Promise(resolve => setTimeout(() => resolve(item * 2), 100));
        }
    }

    async process() {
        const results = [];
        for await (let item of this.asyncGenerator()) {
            results.push(item);
        }
        return results;
    }
}

async function main() {
    const asyncProcessor = new AsyncProcessor([1, 2, 3, 4, 5]);
    const result = await asyncProcessor.process();

    const doubleEvenNumbers = result.filter(item => item % 2 === 0);
    const sum = doubleEvenNumbers.reduce((acc, val) => acc + val, 0);

    print(`Processed Data: ${result}`);
    print(`Filtered Even Doubles: ${doubleEvenNumbers}`);
    print(`Sum of Even Doubles: ${sum}`);
}

main().catch(console.error);
