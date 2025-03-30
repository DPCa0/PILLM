class AsyncOperation {
    async *generateNumbers(count) {
        for (let i = 1; i <= count; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));  
            yield i;
        }
    }
}

function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
}

(async () => {
    const operation = new AsyncOperation();
    const numbers = operation.generateNumbers(5);

    for await (const num of numbers) {
        print(`Number: ${num}, Fibonacci: ${fibonacci(num)}`);
    }

    const complexObject = {
        a: { nested: { value: 1 } },
        b: 2,
        c: 3
    };

    const { a: { nested: { value: aValue } }, ...rest } = complexObject;

    print('Destructured Value:', aValue);
    print('Rest:', rest);

    const proxyHandler = {
        get(target, prop) {
            return prop in target ? target[prop] : `Property '${prop}' does not exist.`;
        }
    };

    const proxiedObject = new Proxy(complexObject, proxyHandler);

    print('Accessing existing property:', proxiedObject.a);
    print('Accessing non-existing property:', proxiedObject.nonExistent);

     
    const uniqueFibs = new Set([fibonacci(5), fibonacci(6), fibonacci(7)]);
    const fibMap = new Map([...uniqueFibs].map(num => [num, `Fib:${num}`]));

    print('Map of unique Fibonacci numbers:', fibMap);

     
    const sym = Symbol('unique');
    const objWithSymbol = { [sym]: 'Special Value' };

    print('Symbol property:', Reflect.get(objWithSymbol, sym));

    const promises = [1, 2, 3].map(
        async num => `Result: ${await Promise.resolve(num * 2)}`
    );

    for await (const result of promises) {
        print(result);
    }
})();
