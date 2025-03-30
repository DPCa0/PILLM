 
async function* asyncFibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const logger = new Proxy({}, {
    get: function (target, prop, receiver) {
        print(`Accessed property "${prop}"`);
        return Reflect.get(target, prop, receiver);
    },
    set: function (target, prop, value, receiver) {
        print(`Setting property "${prop}" to "${value}"`);
        return Reflect.set(target, prop, value, receiver);
    }
});

 
(async () => {
    const { log } = await import('console');
    log('Dynamic import complete.');

     
    for await (let num of asyncFibonacci(5)) {
        log(`Fibonacci: ${num}`);
    }

     
    logger.testProperty = 'Proxy demonstration';
    log(logger.testProperty);
})();
