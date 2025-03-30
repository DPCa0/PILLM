 
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const arrayObserver = (arr) => new Proxy(arr, {
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    },
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    }
});

 
const asyncOperation = async () => {
    const fib = fibonacci();
    const fibArray = arrayObserver([]);
    for (let i = 0; i < 10; i++) {
        const next = fib.next().value;
        fibArray.push(memoize(() => next)());
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    print('Final Fibonacci sequence:', fibArray);
};

 
asyncOperation();
