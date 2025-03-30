class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function* asyncGenerator(arr) {
    for (const item of arr) {
        await delay(100);  
        yield item;
    }
}

(async () => {
    const deferred = new Deferred();
    const asyncIter = asyncGenerator([1, 2, 3, 4, 5]);

    async function iterate() {
        for await (const num of asyncIter) {
            print(`Processing number: ${num}`);
            if (num === 3) {
                deferred.resolve('Found number 3, resolving deferred promise!');
            }
        }
    }

    iterate();

    deferred.promise.then(message => {
        print(message);
    });

    const objectHandler = {
        get(target, prop) {
            if (prop in target) {
                print(`Getting property '${prop}' with value: ${target[prop]}`);
                return target[prop];
            } else {
                print(`Property '${prop}' not found`);
                return undefined;
            }
        },
        set(target, prop, value) {
            print(`Setting property '${prop}' to value: ${value}`);
            target[prop] = value;
            return true;
        }
    };

    const targetObject = { name: "JavaScript", level: "advanced" };
    const proxyObject = new Proxy(targetObject, objectHandler);

    print(proxyObject.name);  
    proxyObject.version = "ES2023";  
    print(proxyObject.nonExistent);  
})();
