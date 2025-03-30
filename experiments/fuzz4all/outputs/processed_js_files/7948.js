class Fibonacci {
    constructor() {
        this.memo = new Map();
    }

    calculate(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        
        let result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);
        return result;
    }
}

const fib = new Fibonacci();

async function fetchFibonacci(n) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fib.calculate(n));
        }, 100);
    });
}

(async () => {
    try {
        const numbers = [10, 20, 30, 40, 50];
        
        const promises = numbers.map(async (num) => {
            let result = await fetchFibonacci(num);
            print(`Fibonacci of ${num} is ${result}`);
        });
        
        await Promise.all(promises);
    } catch (error) {
        console.error('Error:', error);
    }
})();
