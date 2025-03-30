class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator(arr) {
    for (let item of arr) {
        await new Promise(res => setTimeout(res, 100));
        yield item * item;
    }
}

const proxyHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        }
        throw new Error(`Property ${prop} does not exist.`);
    }
};

function withLogging(target) {
    return new Proxy(target, proxyHandler);
}

async function processData() {
    const data = [1, 2, 3, 4, 5];
    const deferred = new Deferred();
    const squares = [];

    setTimeout(() => {
        print('Simulating async operation...');
        deferred.resolve();
    }, 500);

    print('Processing data...');
    for await (let square of asyncGenerator(data)) {
        squares.push(square);
    }

    print('Awaiting deferred resolution...');
    await deferred.promise;

    const squaresObj = withLogging({ squares });
    print('Squares:', squaresObj.squares);
}

processData().catch(console.error);
