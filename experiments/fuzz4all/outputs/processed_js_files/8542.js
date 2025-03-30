class Fibonacci {
    #cache = new Map();
    
    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    cachedFibo(n) {
        if (this.#cache.has(n)) return this.#cache.get(n);
        const fiboSeq = this.#calculateFibo(n);
        this.#cache.set(n, fiboSeq);
        return fiboSeq;
    }

    #calculateFibo(n) {
        if (n < 2) return n;
        return this.cachedFibo(n - 1) + this.cachedFibo(n - 2);
    }

    async *asyncIterateFibo(limit) {
        for (let i = 0; i < limit; i++) {
            yield this.cachedFibo(i);
            await new Promise(res => setTimeout(res, 100));  
        }
    }
}

const fib = new Fibonacci();

(async () => {
    print("First 10 Fibonacci numbers using a generator:");
    let iterator = fib[Symbol.iterator]();
    for (let i = 0; i < 10; i++) {
        print(iterator.next().value);
    }

    print("\nFirst 10 Fibonacci numbers using async generator:");
    for await (let num of fib.asyncIterateFibo(10)) {
        print(num);
    }
})();
