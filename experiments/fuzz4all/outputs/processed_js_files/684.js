class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator(arr) {
    for (const item of arr) {
        await new Promise(r => setTimeout(r, 1000));
        yield item;
    }
}

async function processArray() {
    const array = [1, 2, 3, 4, 5];
    const deferred = new Deferred();

    const promiseHandler = async () => {
        for await (const num of asyncGenerator(array)) {
            print(num);
        }
        deferred.resolve('Processing completed!');
    };

    const iterator = promiseHandler();

    deferred.promise
        .then(message => console.log(message))
        .catch(err => console.error('Error:', err));

    await iterator;
}

processArray();
