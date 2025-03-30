 
function logFunctionCalls(target) {
    return new Proxy(target, {
        apply: (target, thisArg, argumentsList) => {
            print(`Calling ${target.name} with arguments: ${JSON.stringify(argumentsList)}`);
            return target.apply(thisArg, argumentsList);
        }
    });
}

 
const fibonacci = logFunctionCalls(function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
});

 
async function computeFibonacciAsync(n) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fibonacci(n));
        }, 1000);
    });
}

 
async function* fibonacciSequenceAsync(n) {
    for (let i = 0; i < n; i++) {
        yield await computeFibonacciAsync(i);
    }
}

 
(async () => {
    const n = 10;   
    for await (const num of fibonacciSequenceAsync(n)) {
        print(num);
    }
})();
