class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }
    
    *generate() {
        let [prev, curr] = [0, 1];
        for (let i = 0; i < this.limit; i++) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }

    getNth(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        let value = n <= 1 ? n : this.getNth(n - 1) + this.getNth(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

async function fetchFibonacci(limit) {
    const fib = new Fibonacci(limit);
    const results = [];
    
    for (let num of fib.generate()) {
        results.push(await Promise.resolve(num));
    }
    
    return results;
}

(async () => {
    try {
        const limit = 10;
        const sequence = await fetchFibonacci(limit);
        print(`First ${limit} Fibonacci numbers:`, sequence);

        const nth = 15;
        print(`${nth}th Fibonacci number:`, new Fibonacci().getNth(nth));
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
