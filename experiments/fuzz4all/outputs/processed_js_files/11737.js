 

 
const handler = {
    get(target, prop, receiver) {
        if (Reflect.has(target, prop)) {
            print(`Getting property '${String(prop)}': ${Reflect.get(target, prop, receiver)}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property '${String(prop)}' does not exist`);
            return undefined;
        }
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${String(prop)}' to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const secretSymbol = Symbol('secret');

 
const target = {
    name: 'Advanced JS',
    [secretSymbol]: 'You found the secret!'
};

 
const proxy = new Proxy(target, handler);

 
async function modifyProxy() {
    proxy.name = 'New JS Tricks';
    
    await new Promise(resolve => setTimeout(resolve, 1000));  
    print(`Secret: ${proxy[secretSymbol]}`);

    proxy.nonExistent = 'This will not trigger a set';
    print(proxy.nonExistent);
}

 
(async function demo() {
    print(proxy.name);
    await modifyProxy();
})();
