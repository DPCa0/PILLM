class FibonacciSequence {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }

    getNthValue(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        let result;
        if (n < 2) {
            result = n;
        } else {
            result = this.getNthValue(n - 1) + this.getNthValue(n - 2);
        }
        this.memo.set(n, result);
        return result;
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error: ', error);
        return null;
    }
}

(async () => {
    const fibonacci = new FibonacciSequence(10);
    for (const value of fibonacci) {
        print(value);
    }

    print('5th Fibonacci number:', fibonacci.getNthValue(5));

    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);
})();
