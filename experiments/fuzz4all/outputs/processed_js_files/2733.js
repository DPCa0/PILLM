 

const handler = {
    get: (target, prop, receiver) => {
        if (typeof target[prop] === 'function') {
            return (...args) => {
                print(`Calling method: ${prop.toString()}`);
                return Reflect.apply(target[prop], target, args);
            };
        }
        print(`Accessing property: ${prop.toString()}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop.toString()} with value: ${value}`);
        return Reflect.set(target, prop, value);
    }
};

class ComplexSystem {
    constructor() {
        this[Symbol.for('logLevel')] = 'INFO';
    }
    
    async initialize() {
        print('Initializing system...');
        await new Promise(resolve => setTimeout(resolve, 1000));  
        print('System initialized.');
    }
    
    [Symbol.for('log')](message) {
        print(`[${this[Symbol.for('logLevel')]}] ${message}`);
    }
}

const proxiedSystem = new Proxy(new ComplexSystem(), handler);

(async () => {
    await proxiedSystem.initialize();
    proxiedSystem[Symbol.for('log')]('Hello, world!');
    proxiedSystem[Symbol.for('logLevel')] = 'DEBUG';
    proxiedSystem[Symbol.for('log')]('Debugging mode is now on.');
})();
