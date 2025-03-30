 
function logMethod(target, key, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        print(`Calling ${key} with`, args);
        const result = originalMethod.apply(this, args);
        print(`Result:`, result);
        return result;
    };
    return descriptor;
}

 
const loggingHandler = {
    get(target, property, receiver) {
        print(`Getting property "${property}"`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting property "${property}" to "${value}"`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
class Example {
    #secretValue = 42;
    static multiplier = 3;

    @logMethod
    multiplyValue(val) {
        return val * Example.multiplier;
    }

    get secret() {
        return this.#secretValue;
    }
}

 
const instance = new Proxy(new Example(), loggingHandler);

 
function* generatorExample() {
    yield Promise.resolve(10);
    yield Promise.resolve(20);
}

(async function() {
    const iterator = generatorExample();
    for await (const value of iterator) {
        print('Generator value:', instance.multiplyValue(value));
    }

    print('Accessing secret:', instance.secret);
})();
