class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function complexOperation(numbers) {
    const deferreds = numbers.map(() => new Deferred());
    const promises = deferreds.map(d => d.promise);

    const results = await Promise.allSettled(promises.map((promise, index) =>
        promise.then(result => `Resolved: ${numbers[index]} -> ${result}`)
              .catch(error => `Rejected: ${numbers[index]} -> ${error}`)));

    return results.map(result => result.value);
}

function* numberGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield i;
    }
}

const asyncIterate = async function*(numbers) {
    for (const number of numbers) {
        await new Promise(resolve => setTimeout(resolve, 50));  
        yield number * 2;  
    }
};

(async () => {
    const numbers = [...numberGenerator(10)];
    const doubledNumbers = [];

    for await (const number of asyncIterate(numbers)) {
        doubledNumbers.push(number);
    }

    const deferreds = numbers.map((n, i) => ({
        resolve: n % 2 === 0 ? n * 10 : Promise.reject(new Error('Odd number')),
        index: i
    }));

    deferreds.forEach(({resolve, index}, i) => {
        setTimeout(() => {
            if (resolve instanceof Promise) {
                resolve.catch(error => deferreds[index].reject(error));
            } else {
                deferreds[index].resolve(resolve);
            }
        }, i * 100);
    });

    const results = await complexOperation(doubledNumbers);
    print(results);
})();
