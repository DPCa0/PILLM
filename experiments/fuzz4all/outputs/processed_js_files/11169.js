class AsyncSequence {
    constructor(...promises) {
        this.promises = promises;
    }

    async execute() {
        const results = [];
        for (const promise of this.promises) {
            results.push(await promise());
        }
        return results;
    }
}

const randomDelay = () => new Promise(resolve => {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => resolve(`Resolved after ${delay}ms`), delay);
});

const asyncSequence = new AsyncSequence(
    () => randomDelay().then(result => `Task 1: ${result}`),
    () => randomDelay().then(result => `Task 2: ${result}`),
    () => randomDelay().then(result => `Task 3: ${result}`)
);

(async () => {
    const results = await asyncSequence.execute();
    print('All tasks completed:', results);
})();

const deferred = () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
};

const de = deferred();
de.promise.then(value => print(`Deferred resolved with: ${value}`));
setTimeout(() => de.resolve('Success!'), 2000);

const objProxy = new Proxy({
    name: 'Advanced JS',
    level: 9000
}, {
    get(target, prop, receiver) {
        if (prop === 'level') {
            return Reflect.get(target, prop, receiver) * 2;
        }
        return Reflect.get(target, prop, receiver);
    }
});

print(`Course: ${objProxy.name}, Level: ${objProxy.level}`);
