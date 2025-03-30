const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        await delay(500);  
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

(async () => {
    const handler = {
        get: (target, prop) => prop in target ? target[prop] : `Property "${prop}" not found.`,
        set: (target, prop, value) => {
            print(`Setting property "${prop}" to value "${value}".`);
            target[prop] = value;
            return true;
        }
    };

    const fibonacciProxy = new Proxy({}, handler);

    const fibonacciLimit = 10;
    print(`Generating the first ${fibonacciLimit} Fibonacci numbers:`);

    let index = 0;
    for await (const num of fibonacciGenerator(fibonacciLimit)) {
        fibonacciProxy[`fib_${index}`] = num;
        print(`fib_${index}: ${fibonacciProxy[`fib_${index}`]}`);
        index++;
    }

    print(fibonacciProxy.nonexistent_property);  
})();
