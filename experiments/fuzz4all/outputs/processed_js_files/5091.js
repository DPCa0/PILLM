 
function* fibonacci(limit) {
    let a = 0, b = 1, n = 0;
    while (n < limit) {
        yield a;
        [a, b] = [b, a + b];
        n++;
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessing Fibonacci index: ${prop}`);
        return target[prop];
    }
};

 
const fibSequence = (() => {
    const limit = 10;
    const sequence = [...fibonacci(limit)];
    const proxySequence = new Proxy(sequence, handler);

     
    const [first, second, ...rest] = proxySequence;
    print(`First: ${first}, Second: ${second}`);

     
    return [...rest.map(num => num * 2), ...sequence.reverse()];
})();

 
async function processFibonacci(sequence) {
    const asyncOperation = num => new Promise(resolve => setTimeout(() => resolve(num ** 2), 100));

    for (let num of sequence) {
        const squared = await asyncOperation(num);
        print(`Squared: ${squared}`);
    }
}

processFibonacci(fibSequence);
