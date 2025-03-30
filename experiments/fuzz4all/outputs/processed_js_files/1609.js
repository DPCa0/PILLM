 

 
function* dataGenerator() {
    let index = 1;
    while (index <= 5) {
        yield new Promise((resolve) => 
            setTimeout(() => resolve(`Data chunk ${index++}`), 1000)
        );
    }
}

 
async function fetchData(generator) {
    for await (const data of generator) {
        print(`Processed: ${data}`);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property "${prop}": ${target[prop]}`);
            return Reflect.get(...arguments);
        }
        return `Property "${prop}" does not exist.`;
    }
};

 
const targetObject = {
    name: 'Complex JS Program',
    version: '1.0',
    execute: async function() {
        print('Execution started...');
        const dataGen = dataGenerator();
        await fetchData(dataGen);
        print('Execution completed.');
    }
};

const proxiedObject = new Proxy(targetObject, handler);

 
(async () => {
    print(`Program: ${proxiedObject.name}, Version: ${proxiedObject.version}`);
    await proxiedObject.execute();
})();
