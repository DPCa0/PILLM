class Fibonacci {
    constructor() {
        this.memo = new Map();
        this.memo.set(0, 0);
        this.memo.set(1, 1);
    }

    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    memoizedFib(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const result = this.memoizedFib(n - 1) + this.memoizedFib(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
}

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        print('Fetched Data:', data.slice(0, 3));  
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    const fib = new Fibonacci();

    print('First 10 Fibonacci numbers using iterator:');
    const fibIterator = fib[Symbol.iterator]();
    print([...Array(10)].map(() => fibIterator.next().value));

    print('Fibonacci number at position 20 using memoization:', fib.memoizedFib(20));
})();
