class NetworkRequest {
    constructor(url) {
        this.url = url;
    }
    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
}

function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (!cache.has(key)) {
            cache.set(key, fn(...args));
        }
        return cache.get(key);
    };
};

const add = (a, b) => a + b;
const memoizedAdd = memoize(add);

(async () => {
    const request = new NetworkRequest('https://api.github.com/users/github');
    const data = await request.fetchData();
    print('Fetched Data:', data);

    const fib = fibonacciSequence();
    print('First 10 Fibonacci Numbers:');
    for (let i = 0; i < 10; i++) {
        print(fib.next().value);
    }

    print('Memoized Addition:');
    print(memoizedAdd(1, 2));
    print(memoizedAdd(1, 2));  
})();
