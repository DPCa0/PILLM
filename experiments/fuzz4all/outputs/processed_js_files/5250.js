const { performance, PerformanceObserver } = require('perf_hooks');
const crypto = require('crypto');

 
const hashString = (str) => crypto.createHash('sha256').update(str).digest('hex');

 
const fibonacci = (() => {
    const memo = new Map();
    return function fib(n) {
        if (memo.has(n)) return memo.get(n);
        if (n <= 1) return n;
        const result = fib(n - 1) + fib(n - 2);
        memo.set(n, result);
        return result;
    };
})();

 
async function asyncFibonacci(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fibonacci(n));
        }, 100);
    });
}

 
const obs = new PerformanceObserver((list, observer) => {
    print(list.getEntries()[0].duration);
    observer.disconnect();
});
obs.observe({ entryTypes: ['measure'] });

(async () => {
    performance.mark('start');
    
     
    const [first, second = 2, ...rest] = [1];
    print(first, second, rest);

    const value = await asyncFibonacci(40);
    print('Fibonacci(40):', value);

    print('Hash of Fibonacci(40):', hashString(value.toString()));

    performance.mark('end');
    performance.measure('Execution time', 'start', 'end');
})();
