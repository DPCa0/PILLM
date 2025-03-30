class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    * [Symbol.iterator]() {
        let i = 0;
        while (true) yield this.calculate(i++);
    }

    calculate(n) {
        if (!this.memo.has(n)) {
            this.memo.set(n, this.calculate(n - 1) + this.calculate(n - 2));
        }
        return this.memo.get(n);
    }
}

const fibonacci = new Fibonacci();

(async () => {
    const asyncFib = async n => {
         
        return new Promise(resolve => {
            setTimeout(() => resolve(fibonacci.calculate(n)), 100);
        });
    };

    for await (const [index, value] of [...fibonacci].slice(0, 10).entries()) {
        print(`Sync Fibonacci(${index}): ${value}`);
    }

    for (let n = 0; n < 10; n++) {
        asyncFib(n).then(value => print(`Async Fibonacci(${n}): ${value}`));
    }
})();
