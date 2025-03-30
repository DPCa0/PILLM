class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* fibonacciAsync(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(curr), 100));
        [prev, curr] = [curr, prev + curr];
    }
}

const deferredFibonacci = new Deferred();

(async () => {
    try {
        const limit = 10;
        const results = [];
        
        for await (const num of fibonacciAsync(limit)) {
            results.push(num);
        }
        
        deferredFibonacci.resolve(results);
    } catch (error) {
        deferredFibonacci.reject(error);
    }
})();

deferredFibonacci.promise
    .then(fibSeq => console.log(`Fibonacci sequence: ${fibSeq.join(', ')}`))
    .catch(err => console.error(`Error: ${err.message}`));
