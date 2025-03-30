class Fibonacci {
    constructor() {
        this.memo = new Map([[0, 0], [1, 1]]);
    }

    calculate(n) {
        if (this.memo.has(n)) return this.memo.get(n);
        const value = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

const fibonacciProxyHandler = {
    get(target, prop) {
        const num = parseInt(prop);
        if (!isNaN(num) && num >= 0) {
            return target.calculate(num);
        }
        return target[prop];
    }
};

const fib = new Proxy(new Fibonacci(), fibonacciProxyHandler);

const asyncFibonacci = async (n) => {
    if (n < 0) throw new Error("Invalid input");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fib[n]);
        }, 1000);
    });
};

(async () => {
    try {
        print(await asyncFibonacci(10));  
        print(await asyncFibonacci(15));  
    } catch (e) {
        console.error(e);
    }
})();
