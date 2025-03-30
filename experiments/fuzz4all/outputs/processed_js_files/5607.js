class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncRange(start, end) {
    for (let i = start; i < end; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 100));
    }
}

const cache = new Proxy({}, {
    get(target, name) {
        if (!(name in target)) {
            target[name] = new Deferred();
        }
        return target[name].promise;
    },
    set(target, name, value) {
        if (name in target && target[name] instanceof Deferred) {
            target[name].resolve(value);
        }
        target[name] = value;
        return true;
    }
});

(async () => {
    print("Fetching async range...");
    for await (const number of asyncRange(0, 5)) {
        print(`Received: ${number}`);
        cache[number] = number * number;  
    }

    print("Fetching from cache with Proxy...");
    for (let i = 0; i < 5; i++) {
        const squared = await cache[i];
        print(`Cached square of ${i} is: ${squared}`);
    }
})();
