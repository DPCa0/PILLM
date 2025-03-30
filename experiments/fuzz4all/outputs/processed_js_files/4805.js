 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncNumberGenerator(max, delayMs) {
    for (let i = 1; i <= max; i++) {
        await delay(delayMs);
        yield i;
    }
}

 
const createLoggingProxy = obj => new Proxy(obj, {
    get(target, prop, receiver) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
});

 
const privateData = new WeakMap();
class User {
    constructor(name, age) {
        privateData.set(this, { name, age });
    }

    getInfo() {
        const data = privateData.get(this);
        return `Name: ${data.name}, Age: ${data.age}`;
    }
}

 
(async () => {
    print("Async Generator Example:");
    const asyncGen = asyncNumberGenerator(5, 500);
    for await (const num of asyncGen) {
        print(num);
    }

    print("\nProxy Example:");
    const obj = createLoggingProxy({ foo: 'bar' });
    print(obj.foo);
    obj.foo = 'baz';

    print("\nWeakMap Example:");
    const user = new User('Alice', 30);
    print(user.getInfo());
})();
