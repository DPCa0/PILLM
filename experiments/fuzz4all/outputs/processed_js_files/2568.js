class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.limit; i++) {
            yield this.fib(i);
        }
    }

    fib(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);

        const result = this.fib(n - 1) + this.fib(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        return await response.json();
    } catch (error) {
        console.error("Fetching error:", error);
        return null;
    }
}

const fibonacciSeq = new Fibonacci(10);
print([...fibonacciSeq]);

fetchData('https://api.agify.io?name=michael')
    .then(data => {
        if (data) {
            const { name, age } = data;
            print(`Predicted age for ${name} is ${age}`);
        }
    });
