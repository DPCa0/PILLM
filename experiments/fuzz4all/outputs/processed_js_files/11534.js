class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGen() {
    const deferred = new Deferred();
    setTimeout(() => deferred.resolve("Hello"), 1000);
    yield await deferred.promise;

    const deferred2 = new Deferred();
    setTimeout(() => deferred2.resolve("World"), 1000);
    yield await deferred2.promise;
}

(async () => {
    const greetingParts = [];
    for await (const part of asyncGen()) {
        greetingParts.push(part);
    }
    print(greetingParts.join(", ") + "!");
})();
