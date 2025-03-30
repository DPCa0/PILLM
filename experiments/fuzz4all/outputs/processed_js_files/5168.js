 
async function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        await new Promise(resolve => setTimeout(resolve, 100));  
    }
}

 
const fibProxyHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing Fibonacci number at index ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            throw new ReferenceError(`Property '${prop}' does not exist.`);
        }
    }
};

 
(async () => {
    const fibonacciNumbers = [];
    for await (const num of fibonacciGenerator(10)) {
        fibonacciNumbers.push(num);
    }

    const fibonacciProxy = new Proxy(fibonacciNumbers, fibProxyHandler);

     
    const [first, second, ...others] = fibonacciProxy;
    print(`First: ${first}, Second: ${second}`);
    print(`Other Numbers: ${others.join(', ')}`);

     
    print(`Fifth Fibonacci number: ${fibonacciProxy[4]}`);
})();
