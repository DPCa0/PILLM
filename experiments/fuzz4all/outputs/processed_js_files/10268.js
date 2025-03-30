 

 
const delay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000)));

 
async function* asyncNumberGenerator(max) {
    for (let i = 1; i <= max; i++) {
        await delay();
        yield i;
    }
}

 
const loggingHandler = {
    get(target, prop) {
        print(`Getting property: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const targetObject = { count: 0 };
const proxyObject = new Proxy(targetObject, loggingHandler);

 
async function processNumbers(max) {
    for await (const num of asyncNumberGenerator(max)) {
        print(`Generated number: ${num}`);
        proxyObject.count += num;
    }
    print(`Final count: ${proxyObject.count}`);
}

 
processNumbers(5).then(() => print('Processing complete.'));
