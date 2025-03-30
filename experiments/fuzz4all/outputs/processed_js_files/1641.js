class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }
    
    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    calculate(n) {
        if (this.memo.has(n)) {
            return this.memo.get(n);
        } else {
            let result = this.calculate(n - 1) + this.calculate(n - 2);
            this.memo.set(n, result);
            return result;
        }
    }
}

const fibSequence = new Fibonacci();

 
async function* asyncFibonacciPrinter(limit) {
    let count = 0;
    for (const num of fibSequence) {
        if (count >= limit) break;
        yield new Promise(resolve => setTimeout(() => resolve(num), 500));
        count++;
    }
}

(async () => {
    print(`Calculating Fibonacci(10): ${fibSequence.calculate(10)}`);

    print("Fibonacci sequence up to 10 numbers:");
    for await (const num of asyncFibonacciPrinter(10)) {
        print(num);
    }
})();
