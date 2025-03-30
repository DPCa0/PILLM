class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < 3; i++) {
            yield new Promise(res => setTimeout(() => res(i), 1000));
        }
    }
};

async function* mergeIterables(...iterables) {
    const deferreds = iterables.map(() => new Deferred());

    iterables.forEach((iterable, index) => {
        (async () => {
            for await (const item of iterable) {
                deferreds[index].resolve({ value: item, done: false });
                deferreds[index] = new Deferred();
            }
            deferreds[index].resolve({ value: undefined, done: true });
        })();
    });

    while (deferreds.some(d => !d.promise.done)) {
        yield Promise.race(deferreds.map(d => d.promise));
    }
}

async function main() {
    const it1 = asyncIterable[Symbol.asyncIterator]();
    const it2 = asyncIterable[Symbol.asyncIterator]();

    for await (const { value, done } of mergeIterables(it1, it2)) {
        if (!done) {
            print(value);
        }
    }
}

main();
