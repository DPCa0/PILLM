class AsyncNumberProcessor {
    constructor(numbers) {
        this.numbers = numbers;
    }

    async *[Symbol.asyncIterator]() {
        for (const number of this.numbers) {
             
            await new Promise(resolve => setTimeout(resolve, 100));
            yield number;
        }
    }

    async processNumbers() {
        const processedNumbers = [];
        for await (const number of this) {
            processedNumbers.push(this.#processNumber(number));
        }
        return processedNumbers;
    }

    #processNumber(number) {
         
        return number ^ (number << 1);
    }
}

(async () => {
    const numbers = [1, 2, 3, 4, 5];
    const processor = new AsyncNumberProcessor(numbers);
    const result = await processor.processNumbers();

    const doubledResult = result.map(num => num * 2);
    const squaredResult = doubledResult.flatMap(num => [num, num ** 2]);

    print([...new Set(squaredResult)].sort((a, b) => a - b));
})();
