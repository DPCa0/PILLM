class Fibonacci {
    constructor() {
        this.memo = new Proxy({}, {
            get: (target, name) => name in target ? target[name] : (target[name] = this.calculate(name))
        });
    }

    calculate(n) {
        if (n < 2) return n;
        return this.memo[n - 1] + this.memo[n - 2];
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function run() {
    const fib = new Fibonacci();
    const tasks = Array.from({ length: 10 }, (_, i) => i + 1).map(async n => {
        await delay(n * 100);
        print(`Fib(${n}):`, fib.memo[n]);
    });

    await Promise.all(tasks);
})();
