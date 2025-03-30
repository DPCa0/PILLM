 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* dataGenerator() {
    yield 'First';
    yield 'Second';
    yield 'Third';
}

 
async function processData(generator) {
    for (let value of generator) {
        print(`Processing: ${value}`);
        await delay(1000);  
    }
}

 
const logger = new Proxy({}, {
    get: (obj, prop) => {
        print(`Accessing property "${prop}"`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        obj[prop] = value;
        return true;
    }
});

 
logger.message = "Hello Proxy!";
print(logger.message);

 
(async () => {
    const gen = dataGenerator();
    await processData(gen);
    print("All data processed");
})();
