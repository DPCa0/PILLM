 
const { EventEmitter } = require('events');

 
async function* fetchDataSimulator() {
    const dataChunks = ['data1', 'data2', 'data3'];
    for (const chunk of dataChunks) {
        await new Promise(res => setTimeout(res, 1000));  
        yield chunk;
    }
}

 
function createMultiplierProxy(multiplier) {
    return new Proxy({}, {
        get: (target, prop) => {
            if (!isNaN(prop)) {
                return prop * multiplier;
            } else {
                throw new Error(`Property "${prop}" is not a number`);
            }
        }
    });
}

 
async function processData() {
    const eventEmitter = new EventEmitter();
    const multiplierProxy = createMultiplierProxy(2);

    eventEmitter.on('data', data => {
        print(`Processed: ${multiplierProxy[data]}`);
    });

    for await (const data of fetchDataSimulator()) {
        eventEmitter.emit('data', data);
    }
}

 
(async () => {
    try {
        print('Starting data processing...');
        await processData();
        print('Data processing complete.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
