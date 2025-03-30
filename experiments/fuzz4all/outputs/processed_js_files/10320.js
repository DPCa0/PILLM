class Fibonacci {
    #memo = new Map();

    constructor() {
        this.#memo.set(0, 0);
        this.#memo.set(1, 1);
    }

    *generate(n) {
        for (let i = 0; i < n; i++) {
            yield this.#calculate(i);
        }
    }

    #calculate(n) {
        if (this.#memo.has(n)) {
            return this.#memo.get(n);
        }
        const result = this.#calculate(n - 1) + this.#calculate(n - 2);
        this.#memo.set(n, result);
        return result;
    }
}

async function delayedLog(iterator) {
    for (let value of iterator) {
        await new Promise(resolve => setTimeout(resolve, 500));
        print(value);
    }
}

const fib = new Fibonacci();
const fibSequence = fib.generate(10);

(async () => {
    await delayedLog(fibSequence);
})();
