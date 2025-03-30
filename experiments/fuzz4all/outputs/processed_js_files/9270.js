 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* asyncGenerator() {
    yield delay(1000).then(() => 'First result');
    yield delay(2000).then(() => 'Second result');
    yield delay(3000).then(() => 'Third result');
}

 
const handler = {
    get: (target, property) => {
        print(`Accessed property "${property}"`);
        return target[property];
    }
};

 
const data = new Proxy({
    info: 'Some data',
    numbers: [1, 2, 3]
}, handler);

 
async function asyncProcess(gen, dataProxy) {
    const iterator = gen();
    for await (const result of iterator) {
        print(result);
        print(`Data Info: ${dataProxy.info}`);
        print(`Numbers: ${dataProxy.numbers.join(', ')}`);
    }
}

 
asyncProcess(asyncGenerator, data);
