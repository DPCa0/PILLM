class Fibonacci {
    #memo = new Map([[0, 0], [1, 1]]);  

    *sequence(limit) {  
        for (let i = 0; i < limit; i++) {
            yield this.calculate(i);
        }
    }

    calculate(n) {
        if (this.#memo.has(n)) return this.#memo.get(n);
        const value = this.calculate(n - 1) + this.calculate(n - 2);
        this.#memo.set(n, value);
        return value;
    }
}

async function delayedLog(item, delay) {  
    return new Promise(resolve => setTimeout(() => {
        print(item);
        resolve();
    }, delay));
}

(async () => {
    const fib = new Fibonacci();
    const limit = 10;
    const delay = 500;  

    const sequence = fib.sequence(limit);

     
    for await (const num of sequence) {
        await delayedLog(num, delay);
    }
})();
