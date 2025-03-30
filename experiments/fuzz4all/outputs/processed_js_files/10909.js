 
class FibonacciSequence {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }

    *generate() {
        let a = 0, b = 1;
        for (let i = 0; i < this.limit; i++) {
            [a, b] = [b, a + b];
            yield a;
        }
    }

    memoize(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        
        const result = this.memoize(n - 1) + this.memoize(n - 2);
        this.memo.set(n, result);
        return result;
    }

    async getSequence() {
        const sequence = [];
        for (const value of this.generate()) {
            sequence.push(value);
        }
        return sequence;
    }
}

(async () => {
    const fib = new FibonacciSequence(10);
    
     
    const sequence = await fib.getSequence();
    
     
    print(`First 10 Fibonacci numbers: ${sequence.join(', ')}`);

     
    const [first, second, ...rest] = sequence;
    print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);
    
     
    const uniqueNumbers = new Set(sequence);
    print('Unique Fibonacci Numbers:', [...uniqueNumbers].join(', '));

     
    print(`20th Fibonacci number: ${fib.memoize(20)}`);
})();
