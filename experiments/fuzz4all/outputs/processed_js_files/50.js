 

 
const asyncOp = (value, delay) => 
    new Promise(resolve => setTimeout(() => resolve(value), delay));

 
function* generatePromises() {
    yield asyncOp('First', 1000);
    yield asyncOp('Second', 500);
    yield asyncOp('Third', 700);
}

 
async function processGenerator(gen) {
    for (const promise of gen) {
        print(await promise);
    }
}

 
const handler = {
    apply: (target, thisArg, args) => {
        print('Intercepted function call');
        return Reflect.apply(target, thisArg, args);
    }
};

 
const interceptedLog = new Proxy(console.log, handler);

 
interceptedLog('Test message');

 
processGenerator(generatePromises());
