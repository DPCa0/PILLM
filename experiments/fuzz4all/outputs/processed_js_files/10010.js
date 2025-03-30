class AsyncOperations {
    constructor() {
        this.data = [10, 20, 30, 40];
    }

    async *dataGenerator() {
        for (const item of this.data) {
            yield await this.asyncProcess(item);
        }
    }

    async asyncProcess(num) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(num * 2), 1000)
        );
    }
}

(async () => {
    const operations = new AsyncOperations();
    const results = [];

    for await (const result of operations.dataGenerator()) {
        results.push(result);
    }

    const finalResults = results
        .map(num => num + 5)
        .filter(num => num % 3 === 0);

    print(finalResults);

    const sum = finalResults.reduce((acc, curr) => acc + curr, 0);
    print(`Sum of filtered results: ${sum}`);
})();
