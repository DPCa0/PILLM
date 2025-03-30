class AsyncCache {
    constructor() {
        this.cache = new Map();
    }

    async get(key, asyncFetcher) {
        if (this.cache.has(key)) {
            return Promise.resolve(this.cache.get(key));
        }

        const data = await asyncFetcher();
        this.cache.set(key, data);
        return data;
    }
}

function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function fetchData(apiUrl) {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
}

async function main() {
    const cache = new AsyncCache();
    const fibGen = fibonacciGenerator();
    
    try {
        const fibonacciNumbers = [...Array(10)].map(() => fibGen.next().value);
        print('First 10 Fibonacci numbers:', fibonacciNumbers);

        const apiData = await cache.get('https://api.example.com/data', () => fetchData('https://api.example.com/data'));
        print('Fetched API data:', apiData);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
