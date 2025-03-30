class Fibonacci {
    constructor() {
        this.memo = new Proxy({}, {
            get: (obj, prop) => prop in obj ? obj[prop] : (obj[prop] = this.calculate(prop))
        });
    }

    calculate(n) {
        return n <= 1 ? n : this.memo[n - 1] + this.memo[n - 2];
    }
}

const fibonacci = new Fibonacci();

(async function* fibonacciSequence(limit) {
    for (let i = 0; i < limit; i++) {
        yield fibonacci.calculate(i);
    }
})(10)
    .then(async function(generator) {
        for await (const num of generator) {
            print(num);
        }
    })
    .catch(console.error);

const dataHandler = {
    data: [],
    [Symbol.iterator]: function*() {
        yield* this.data;
    },
    addData(...args) {
        this.data.push(...args);
    }
};

dataHandler.addData(...[...fibonacciSequence(10)]
    .then(generator => Array.from(generator))
    .catch(console.error));

for (const value of dataHandler) {
    print(value);
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const delayedLog = async message => {
    await wait(1000);
    print(message);
};

Promise.race([
    delayedLog("First"),
    delayedLog("Second"),
    delayedLog("Third"),
]).catch(console.error);
