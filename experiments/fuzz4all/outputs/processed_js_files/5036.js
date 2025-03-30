class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* fibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

(async function main() {
    const deferred = new Deferred();

    setTimeout(() => deferred.resolve('Async operation complete!'), 2000);

    print(await deferred.promise);

    const results = [];
    for await (const num of fibonacci(10)) {
        results.push(num);
    }

    const maxFibo = Math.max(...results);
    const resultString = results.map(num => `Fibonacci: ${num}`).join(', ');

    const sumFibo = results.reduce((acc, val) => acc + val, 0);
    print(`Max Fibonacci: ${maxFibo}`);
    print(`Sum of Fibonacci: ${sumFibo}`);
    print(`Results: ${resultString}`);

    const proxyHandler = {
        get: (target, prop) => {
            if (prop in target) {
                return target[prop];
            }
            return `Property "${prop}" does not exist!`;
        }
    };

    const proxy = new Proxy({ ...results }, proxyHandler);
    print(proxy[0]);     
    print(proxy[20]);    
})();
