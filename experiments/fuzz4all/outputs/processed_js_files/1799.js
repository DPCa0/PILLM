class AsyncNumberGenerator {
    constructor() {
        this.numbers = Array.from({ length: 10 }, (_, i) => i + 1);
    }

    *numberGenerator() {
        for (const number of this.numbers) {
            yield number;
        }
    }

    async asyncIterableNumbers() {
        for await (const num of this.asyncNumberGenerator()) {
            print(`Async number: ${num}`);
        }
    }

    async *asyncNumberGenerator() {
        for (const number of this.numbers) {
            await new Promise(res => setTimeout(res, 100));
            yield number * number;
        }
    }
}

const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data.slice(0, 5);
};

(async () => {
    print('Synchronous iteration over numbers:');
    const generator = new AsyncNumberGenerator().numberGenerator();
    for (const value of generator) {
        print(`Sync number: ${value}`);
    }

    print('\nAsynchronous iteration over squared numbers:');
    await new AsyncNumberGenerator().asyncIterableNumbers();

    print('\nFetching and displaying remote data:');
    try {
        const data = await fetchData();
        const mappedData = data.map(({ id, title }) => ({ id, title }));
        console.table(mappedData);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();
