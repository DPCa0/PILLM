class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Proxy({}, {
            get: (target, name) => name in target ? target[name] : this.compute(name),
            set: (target, name, value) => (target[name] = value, true)
        });
    }

    compute(n) {
        if (n <= 1) return n;
        if (!this.memo[n]) this.memo[n] = this.memo[n - 1] + this.memo[n - 2];
        return this.memo[n];
    }

    *[Symbol.iterator]() {
        let i = 0;
        while (i <= this.limit) {
            yield this.memo[i];
            i++;
        }
    }
}

const asyncPrint = async (gen) => {
    for await (const num of gen) {
        await new Promise(resolve => setTimeout(resolve, 500));
        print(num);
    }
};

(async () => {
    const fib = new Fibonacci(10);
    await asyncPrint(fib);
})();
