(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    class Fibonacci {
        constructor() {
            this.memo = new Map();
        }

        calculate(n) {
            if (n < 2) return n;
            if (this.memo.has(n)) return this.memo.get(n);
            const result = this.calculate(n - 1) + this.calculate(n - 2);
            this.memo.set(n, result);
            return result;
        }
    }

    const generateFibonacciSequence = (count) => {
        const fib = new Fibonacci();
        return Array.from({ length: count }, (_, i) => fib.calculate(i));
    }

    const numbers = generateFibonacciSequence(10);

    const enhancedNumbers = numbers.map(num => ({
        original: num,
        squared: num ** 2,
        cubed: num ** 3,
    }));

    for await (const { original, squared, cubed } of enhancedNumbers) {
        await delay(500);
        print(`Number: ${original}, Squared: ${squared}, Cubed: ${cubed}`);
    }
})();
