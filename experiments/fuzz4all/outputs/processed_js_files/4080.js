class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* fibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const fibPromise = async (num) => {
    const deferred = new Deferred();
    setTimeout(() => {
        let result = [];
        (async () => {
            for await (let num of fibonacci(num)) {
                result.push(num);
            }
            deferred.resolve(result);
        })();
    }, 1000);
    return deferred.promise;
};

(async () => {
    const num = 10;
    const result = await fibPromise(num);
    print(`The first ${num} Fibonacci numbers are:`, result);
})();

 
const handler = {
    get: (obj, prop) => {
        print(`Accessing ${prop} property`);
        return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} property to ${value}`);
        obj[prop] = value * 2;  
        return true;
    }
};

const originalObj = { x: 10 };
const proxyObj = new Proxy(originalObj, handler);

proxyObj.x;  
proxyObj.y = 20;  
print(originalObj);  
