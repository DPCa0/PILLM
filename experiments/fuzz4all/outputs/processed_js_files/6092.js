class Fibonacci {
    constructor() {
        this.memo = new Map();
        this.memo.set(0, 0);
        this.memo.set(1, 1);
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (true) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    nth(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        let value = this.nth(n - 1) + this.nth(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

(async () => {
    const fib = new Fibonacci();
    print("First 10 Fibonacci numbers:");
    for (const [index, value] of [...fib].entries()) {
        print(value);
        if (index >= 9) break;
    }

    print("5th Fibonacci:", fib.nth(5));

    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    print("Fetching data from URL...");
    const data = await fetchData(url);
    print("Fetched data:", data);

    print("Factorial of 5:", factorial(5));
})();
