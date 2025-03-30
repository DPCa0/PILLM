class AsyncNumberProcessor {
    constructor(numbers) {
        this.numbers = numbers;
    }

    *generateIndices() {
        for (let i = 0; i < this.numbers.length; i++) {
            yield i;
        }
    }

    async #doubleNumber(num) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 2), 100);
        });
    }

    async processNumbers() {
        const results = await Promise.all(this.numbers.map(async (num) => {
            const doubled = await this.#doubleNumber(num);
            return { original: num, doubled };
        }));

        return Object.fromEntries(results.map(({ original, doubled }) => [original, doubled]));
    }

    async logProcessedNumbers() {
        const processedNumbers = await this.processNumbers();
        for (const [original, doubled] of Object.entries(processedNumbers)) {
            print(`Original: ${original}, Doubled: ${doubled}`);
        }
    }
}

(async () => {
    const numbers = [1, 2, 3, 4, 5];
    const processor = new AsyncNumberProcessor(numbers);
    await processor.logProcessedNumbers();
})();
