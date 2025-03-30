 

 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 1000));

 
function* asyncGenerator() {
    print("Starting async generator...");
    const data1 = yield fetchData();
    print(`Received data1: ${data1}`);
    const data2 = yield fetchData();
    print(`Received data2: ${data2}`);
    return data1 + data2;
}

 
async function runGenerator(gen) {
    const iterator = gen();
    let result = iterator.next();
    
    while (!result.done) {
        const value = await result.value;
        result = iterator.next(value);
    }
    return result.value;
}

 
const handler = {
    get: function(target, property) {
        print(`Accessing property: ${property}`);
        if (property === 'run') {
            return async function() {
                const result = await runGenerator(target.generatorFunction);
                print(`Total result: ${result}`);
                return result;
            };
        }
        return target[property];
    }
};

const complexObject = {
    generatorFunction: asyncGenerator
};

 
const proxy = new Proxy(complexObject, handler);

 
(async () => {
    await proxy.run();
})();
