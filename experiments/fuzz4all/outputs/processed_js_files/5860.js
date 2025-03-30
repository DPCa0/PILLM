class Fibonacci {
    constructor() {
        this.memo = new Map();
    }

    *generate(n) {
        if (n <= 1) {
            yield n;
        } else {
            if (!this.memo.has(n)) {
                const fn1 = this.generate(n - 1);
                const fn2 = this.generate(n - 2);
                this.memo.set(n, (yield* fn1) + (yield* fn2));
            }
            yield this.memo.get(n);
        }
    }
}

const asyncFibonacci = async (n) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fib = new Fibonacci();
            const result = [...fib.generate(n)].pop();
            resolve(result);
        }, 1000);
    });
};

(async () => {
    try {
        const results = await Promise.all([
            asyncFibonacci(10),
            asyncFibonacci(15),
            asyncFibonacci(20),
        ]);

        const [result10, result15, result20] = results;

        print(`Fib(10): ${result10}`);
        print(`Fib(15): ${result15}`);
        print(`Fib(20): ${result20}`);
    } catch (err) {
        console.error("Error computing Fibonacci:", err);
    }
})();
