 
function* fibonacci(n) {
    let a = 0, b = 1;
    while (n--) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}": ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property "${prop}" does not exist.`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
async function getFibonacciSequence(n) {
    const proxy = new Proxy({}, handler);
    proxy.limit = n;

    print(`Generating Fibonacci sequence up to ${proxy.limit} numbers:`);

    const fib = [];
    for (let num of fibonacci(proxy.limit)) {
        fib.push(num);
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fib);
        }, 1000);
    });
}

 
(async () => {
    try {
        const sequence = await getFibonacciSequence(10);
        print('Fibonacci Sequence:', sequence);
    } catch (error) {
        console.error('Error:', error);
    }
})();
