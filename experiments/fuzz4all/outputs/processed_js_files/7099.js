 
const fs = require('fs');
const EventEmitter = require('events');

 
function readConfigFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(JSON.parse(data));
        });
    });
}

 
class ConfigEmitter extends EventEmitter {}
const configEmitter = new ConfigEmitter();

 
const logHandler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property: ${String(prop)}`);
            return Reflect.get(target, prop, receiver);
        }
        console.warn(`Property ${String(prop)} does not exist!`);
        return undefined;
    }
};
const CONFIG_SYMBOL = Symbol('config');
let config = new Proxy({}, logHandler);

 
async function processConfig() {
    try {
        const configData = await readConfigFile('./config.json');
        config[CONFIG_SYMBOL] = configData;
        configEmitter.emit('configLoaded', configData);
    } catch (error) {
        console.error('Error reading config:', error);
    }
}

 
configEmitter.on('configLoaded', (data) => {
    print('Configuration Loaded:', data);
    print('Attempting to access non-existent property:', config.nonExistentProp);
});

 
processConfig();

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    for (;;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const fibGen = fibonacciGenerator();
print('First 5 Fibonacci numbers:', [...Array(5)].map(() => fibGen.next().value));

**Note**: This code uses asynchronous file reading, custom events, Proxies for property access logging, Symbols, and a Generator function to showcase various advanced JavaScript features. Make sure to have a `config.json` file in the same directory for it to read.