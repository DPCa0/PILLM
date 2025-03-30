 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const uniqueSymbol = Symbol('unique');

 
const targetObject = { name: 'JavaScript' };
const handler = {
    get(target, prop, receiver) {
        print(`Getting property ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property ${String(prop)} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy(targetObject, handler);

 
async function asyncProcess() {
    proxy.name = 'ECMAScript';
    print(proxy.name);

    proxy[uniqueSymbol] = 'Special Value';
    print(proxy[uniqueSymbol]);

    print('Starting asynchronous operation...');
    await delay(1000);
    print('Operation complete after 1 second delay.');
}

asyncProcess();
