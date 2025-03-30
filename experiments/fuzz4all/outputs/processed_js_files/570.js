class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *generate() {
        let [a, b] = [0, 1];
        while (a <= this.limit) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    async sumEvenFibonacci() {
        const generator = this.generate();
        let sum = 0;
        for (const num of generator) {
            if (num % 2 === 0) {
                sum += num;
            }
        }
        return sum;
    }

    async #privateAsyncFunction() {
        return new Promise((resolve) => setTimeout(() => resolve("Private Async Response"), 1000));
    }

    async callPrivateAsync() {
        return await this.#privateAsyncFunction();
    }
}

 
const handler = {
    get(target, prop) {
        if (prop === 'limit') {
            print(`Accessing the limit: ${target[prop]}`);
        }
        return target[prop];
    }
};

(async () => {
    const fib = new Proxy(new Fibonacci(4000000), handler);

    print("Even Fibonacci Sum:", await fib.sumEvenFibonacci());

    print("Private Async Call:", await fib.callPrivateAsync());
})();
