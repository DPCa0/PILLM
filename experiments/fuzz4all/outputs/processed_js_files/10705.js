class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.memo = new Map();
    }
  
    *generate(n = 1, a = 0, b = 1) {
        if (n > this.limit) return;
        yield a;
        yield* this.generate(n + 1, b, a + b);
    }
  
    getMemoized(n) {
        if (this.memo.has(n)) {
            print(`Fetching memoized result for ${n}`);
            return this.memo.get(n);
        }
        const value = n <= 1 ? n : this.getMemoized(n - 1) + this.getMemoized(n - 2);
        this.memo.set(n, value);
        return value;
    }
}

(async () => {
    const fib = new Fibonacci(10);
  
    print('Generated Fibonacci Sequence:');
    for (const num of fib.generate()) {
        print(num);
    }

    print('\nMemoized Fibonacci Values:');
    print(fib.getMemoized(5));
    print(fib.getMemoized(7));
    print(fib.getMemoized(5));  
  
    const asyncFibonacci = n => new Promise(resolve => setTimeout(() => resolve(fib.getMemoized(n)), 1000));
  
    print('\nAsync Fetch:');
    const fib7 = await asyncFibonacci(7);
    print(`Fibonacci(7): ${fib7}`);
})();
