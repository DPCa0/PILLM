class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const cache = new Proxy({}, {
    get: (target, key) => {
        if (!(key in target)) {
            target[key] = fetchResource(key);
        }
        return target[key];
    }
});

async function fetchResource(resourceName) {
    print(`Fetching resource: ${resourceName}`);
    const deferred = new Deferred();
    setTimeout(() => deferred.resolve(`Data for ${resourceName}`), Math.random() * 2000);
    return deferred.promise;
}

async function* fetchGenerator() {
    const resources = ['resource1', 'resource2', 'resource3'];
    for (const resource of resources) {
        yield cache[resource];
    }
}

(async () => {
    for await (const data of fetchGenerator()) {
        print(data);
    }
})();
