 

 
function delayedPromise(value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), Math.random() * 1000);
    });
}

 
function* dataGenerator() {
    yield delayedPromise('First');
    yield delayedPromise('Second');
    yield delayedPromise('Third');
}

 
const logHandler = {
    get(target, property) {
        print(`Accessing property '${property}'`);
        return target[property];
    }
};

 
async function processData(generator) {
    const proxyGen = new Proxy(generator, logHandler);
    
    for (let promise of proxyGen) {
        const data = await promise;
        print(`Processed: ${data}`);
    }
}

 
processData(dataGenerator());
