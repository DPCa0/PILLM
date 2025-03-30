 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function asyncProcess(item) {
    const ms = Math.floor(Math.random() * 1000);
    await delay(ms);
    print(`Processed ${item} after ${ms}ms`);
    return `${item} done`;
}

 
function* itemGenerator(items) {
    for (let item of items) {
        yield item;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
async function processItems(generator) {
    const results = [];
    for (let item of generator) {
        results.push(await asyncProcess(item));
    }
    return results;
}

 
const items = ['apple', 'banana', 'cherry'];

 
const proxiedItems = new Proxy(items, handler);

 
(async () => {
    const itemGen = itemGenerator(proxiedItems);
    const results = await processItems(itemGen);
    print('All items processed:', results);
})();
