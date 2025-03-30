 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property ${String(prop)} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const target = {
    [Symbol('id')]: 1,
    name: 'John Doe',
    greet() {
        return `Hello, my name is ${this.name}`;
    }
};

 
const proxy = new Proxy(target, handler);

 
async function interactWithProxy() {
    print(proxy.greet());
    proxy.name = 'Jane Doe';

    await delay(1000);

    print(proxy.greet());
}

 
(async () => {
    await interactWithProxy();
})();
