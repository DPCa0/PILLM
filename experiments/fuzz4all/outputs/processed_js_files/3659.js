 

class DelayedOperation {
    constructor(time) {
        this.time = time;
    }

    async performOperation() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Operation completed after ${this.time}ms`);
            }, this.time);
        });
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'performOperation') {
            return function() {
                print(`Intercepting operation: ${prop}`);
                const start = Date.now();
                return Reflect.apply(target[prop], receiver, arguments).then(result => {
                    const end = Date.now();
                    print(`Operation took ${end - start}ms`);
                    return result;
                });
            }
        }
        return Reflect.get(target, prop, receiver);
    }
};

(async () => {
    const operation = new DelayedOperation(2000);
    const proxy = new Proxy(operation, handler);

    try {
        const result = await proxy.performOperation();
        print(result);
    } catch (error) {
        console.error('Operation failed:', error);
    }
})();
