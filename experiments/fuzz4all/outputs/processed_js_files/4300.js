 
const fibonacci = (function() {
    const memo = new Map();
    const fib = n => {
        if (n <= 1) return n;
        if (memo.has(n)) return memo.get(n);
        const result = fib(n - 1) + fib(n - 2);
        memo.set(n, result);
        return result;
    };
    return fib;
})();

 
const handler = {
    get(target, property, receiver) {
        print(`Accessing property '${property}'`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value, receiver);
    }
};

const monitoredObject = new Proxy({}, handler);

 
async function* asyncFibonacci(limit) {
    for (let i = 0; i <= limit; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(fibonacci(i)), 100));
    }
}

 
(async function() {
    for await (const num of asyncFibonacci(10)) {
        print(`Fibonacci number: ${num}`);
    }
})();

 
monitoredObject.message = 'Hello, Proxy!';
print(monitoredObject.message);
