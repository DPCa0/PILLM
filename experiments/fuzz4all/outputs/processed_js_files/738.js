 
const EventEmitter = require('events');

 
async function* fetchData() {
    const data = ['apple', 'banana', 'cherry', 'date'];
    for (const item of data) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield item;
    }
}

 
const myEmitter = new EventEmitter();

 
const fruitMap = new Map();
const weakCache = new WeakSet();

const fruitHandler = {
    get(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        if (prop === 'size') {
            return target.size; 
        }
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        return Reflect.set(target, prop, value);
    }
};

const proxyFruitMap = new Proxy(fruitMap, fruitHandler);

 
async function processFruits() {
    try {
        for await (const fruit of fetchData()) {
            if (!weakCache.has(fruit)) {
                proxyFruitMap.set(fruit, (proxyFruitMap.get(fruit) || 0) + 1);
                weakCache.add(fruit);
                myEmitter.emit('newFruit', fruit);
            }
        }
    } catch (error) {
        console.error('Error processing fruits:', error);
    }
}

 
myEmitter.on('newFruit', (fruit) => {
    print(`New fruit added: ${fruit}`);
});

 
(async () => {
    print('Starting fruit processing...');
    await processFruits();
    print('Finished processing fruits.');
    print('Fruit counts:', Array.from(proxyFruitMap.entries()));
})();
