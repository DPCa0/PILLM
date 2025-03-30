class DeferredPromise extends Promise {
    constructor(executor) {
        let reject, resolve;
        super((res, rej) => {
            resolve = res;
            reject = rej;
            executor(res, rej);
        });
        this.resolve = resolve;
        this.reject = reject;
    }
}

const asyncIterable = {
    [Symbol.asyncIterator]: () => ({
        i: 0,
        async next() {
            if (this.i < 3) {
                await new Promise(r => setTimeout(r, 1000));  
                return { value: this.i++, done: false };
            }
            return { done: true };
        }
    })
};

const complexFunction = async () => {
    const results = [];
    const awaitable = new DeferredPromise((resolve, reject) => {
        setTimeout(() => resolve("Awaitable Resolved!"), 3000);
    });

    for await (let num of asyncIterable) {
        print(`Received from async iterator: ${num}`);
        results.push(num);
    }

    const awaitableResult = await awaitable;
    print(awaitableResult);
    print(`Results: ${results.join(", ")}`);
    
    const map = new Map();
    map.set('a', 1);
    map.set('b', 2);
    
    const proxiedMap = new Proxy(map, {
        get(target, prop) {
            if (prop === 'getAllKeys') {
                return () => Array.from(target.keys());
            }
            return Reflect.get(target, prop);
        }
    });

    print(`Proxied Map Keys: ${proxiedMap.getAllKeys().join(", ")}`);
};

complexFunction().catch(console.error);
