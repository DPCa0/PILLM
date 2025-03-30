 
async function* asyncGenerator() {
    const promises = [
        new Promise((resolve) => setTimeout(() => resolve(1), 300)),
        new Promise((resolve) => setTimeout(() => resolve(2), 200)),
        new Promise((resolve) => setTimeout(() => resolve(3), 100))
    ];

    for await (let num of promises) {
        yield num * num;
    }
}

 
(async () => {
    try {
        const results = [];
        for await (let value of asyncGenerator()) {
            results.push(value);
        }

         
        print('Squared numbers:', results?.join(', ') ?? 'No results');

         
        const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);
        const multiplyBy = (factor) => (x) => x * factor;
        const add = (x, y) => x + y;

        const multiplyAndAdd = compose(
            (res) => add(...res),
            (x) => [multiplyBy(2)(x), multiplyBy(3)(x)]
        );

         
        const tag = (strings, ...values) => 
            strings.reduce((prev, curr, i) => `${prev}${curr}${values[i] || ''}`, '');
        
        const taggedResult = tag`Result of composition: ${multiplyAndAdd(5)}`;
        print(taggedResult);

         
        const handler = {
            get: (target, prop) => {
                print(`Property "${prop}" accessed with value: ${target[prop]}`);
                return target[prop];
            }
        };

        const proxyObj = new Proxy({ a: 10, b: 20 }, handler);
        print(proxyObj.a);
        print(proxyObj.b);

    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
