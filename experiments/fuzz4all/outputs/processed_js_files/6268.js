 

 
const delayedOperation = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Operation Complete!");
        }, 2000);
    });
};

 
const targetObject = {
    status: "idle",
    result: null
};

const handler = {
    get(target, property, receiver) {
        print(`Getting property '${property}'`);
        return Reflect.get(...arguments);
    },
    set(target, property, value, receiver) {
        if (property === 'result' && typeof value !== 'string') {
            throw new TypeError('Result must be a string');
        }
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(...arguments);
    }
};

const proxy = new Proxy(targetObject, handler);

(async () => {
    try {
        proxy.status = "running";
        proxy.result = await delayedOperation();
        print(proxy.result);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    } finally {
        proxy.status = "completed";
    }
})();
