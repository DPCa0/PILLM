 

 
const fetchData = (delay) => {
    return new Promise((resolve) => setTimeout(() => resolve(`Data fetched after ${delay} ms`), delay));
};

 
function* asyncGenerator() {
    yield fetchData(1000);
    yield fetchData(1500);
    yield fetchData(2000);
}

 
async function runGenerator(gen) {
    const iterator = gen();
    for await (const result of iterator) {
        print(result);
    }
}

 
const dataHandler = {
    get: function(target, property) {
        print(`Property accessed: ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Property set: ${property} = ${value}`);
        target[property] = value;
    }
};

 
const dataObject = new Proxy({ name: 'Advanced JS', status: 'Learning' }, dataHandler);

 
(async () => {
    print('Starting generator...');
    await runGenerator(asyncGenerator);
    
    print('\nInteracting with proxy:');
    print(dataObject.name);
    dataObject.level = 'Advanced';
    print(dataObject.level);
})();
