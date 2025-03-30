const delayedExecutor = async (fn, delay) => {
    await new Promise(resolve => setTimeout(resolve, delay));
    return fn();
};

const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);

const curry = (fn) => {
    const curried = (...args) =>
        args.length >= fn.length ?
        fn(...args) :
        (...more) => curried(...args, ...more);
    return curried;
};

const deepFlatten = (arr) =>
    arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? deepFlatten(val) : val), []);

const proxyHandler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessing property "${prop}":`, target[prop]);
            return target[prop];
        }
        throw new Error(`Property "${prop}" not found`);
    }
};

const createProxy = (obj) => new Proxy(obj, proxyHandler);

(async () => {
    const data = { key1: 'value1', key2: 'value2' };
    const proxyData = createProxy(data);

    print(proxyData.key1);

    const curriedFactorial = curry(factorial);
    print('Factorial of 5:', curriedFactorial(5));

    const nestedArray = [1, [2, [3, [4, 5]]]];
    print('Deeply Flattened Array:', deepFlatten(nestedArray));

    await delayedExecutor(() => print('Hello, world! after delay'), 1000);
})();
