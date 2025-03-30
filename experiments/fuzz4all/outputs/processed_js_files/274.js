 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* logGenerator() {
    yield 'Log 1';
    yield 'Log 2';
    yield 'Log 3';
}

 
async function asyncLog(gen) {
    for (let value of gen) {
        print(value);
        await delay(1000);  
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: function(target, prop, value, receiver) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const targetObject = { foo: 'bar' };
const proxyObject = new Proxy(targetObject, handler);

 
(async function main() {
    print('Starting logs with delay using async/await and generator...');
    await asyncLog(logGenerator());

    print('\nUsing Proxy to monitor object access and changes...');
    print(proxyObject.foo);  
    proxyObject.foo = 'baz';  
    print(proxyObject.foo);  
})();
