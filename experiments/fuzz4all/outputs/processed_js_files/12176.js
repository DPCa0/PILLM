(async () => {
     
    const fibonacci = (n, memo = {}) => {
        if (n <= 1) return n;
        if (memo[n]) return memo[n];
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    };

     
    const handler = {
        get: (target, prop, receiver) => {
            if (prop in target) {
                print(`GET ${prop}`);
                return Reflect.get(target, prop, receiver);
            } else {
                console.warn(`Property ${prop} doesn't exist`);
            }
        },
        set: (target, prop, value) => {
            print(`SET ${prop} = ${value}`);
            return Reflect.set(target, prop, value);
        }
    };

    const obj = new Proxy({}, handler);
    obj.name = "Advanced JavaScript";

    print(obj.name);
    print(obj.nonExistentProp);

    // Async/Await with Promise to simulate an asynchronous operation
    const simulateAsyncOp = async () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve("Async operation complete");
            }, 2000);
        });
        const result = await promise;
        print(result);
    };

    // Template literals for dynamic string construction
    const number = 10;
    print(`Fibonacci of ${number} is ${fibonacci(number)}`);

    // Execute the asynchronous operation
    await simulateAsyncOp();

    // Usage of symbols and iterators
    const iterableObj = {
        [Symbol.iterator]: function* () {
            yield 'This';
            yield 'is';
            yield 'an';
            yield 'iterator';
        }
    };

    for (const word of iterableObj) {
        print(word);
    }
})();
