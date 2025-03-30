class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (a <= this.limit) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    calculate(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        const result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);
        return result;
    }

    static async loadData(url) {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    }
}

(async () => {
    const fib = new Fibonacci(100);

    print('Iterating through Fibonacci numbers up to 100:');
    for (const num of fib) {
        print(num);
    }

    print(`10th Fibonacci number (using memoization): ${fib.calculate(10)}`);

    try {
        const data = await Fibonacci.loadData('https://api.example.com/data');
        print('Loaded data:', data);
    } catch (error) {
        console.error('Failed to load data:', error);
    }
})();
