 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function timeExecution(fn) {
    return async function(...args) {
        console.time(fn.name);
        const result = await fn(...args);
        console.timeEnd(fn.name);
        return result;
    };
}

 
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const asyncFibonacci = timeExecution(async function*(limit) {
    const fib = fibonacci();
    for (let i = 0; i < limit; i++) {
        const value = fib.next().value;
        yield delay(500).then(() => value);
    }
});

 
const memoizedFibonacci = memoize(n => {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

 
(async () => {
    print("Asynchronous Fibonacci Sequence:");
    const asyncFib = asyncFibonacci(5);
    for await (const num of asyncFib) {
        print(num);
    }

    print("\nMemoized Fibonacci:");
    print(memoizedFibonacci(30));   
    print(memoizedFibonacci(30));   
})();
