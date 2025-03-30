 
const handler = {
    get(target, property) {
        print(`Getting ${property}`);
        return property in target ? target[property] : 'Property does not exist';
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = {
    name: 'Advanced JS',
    version: '1.0'
};

const proxy = new Proxy(targetObject, handler);

 
async function* asyncGen() {
    let i = 0;
    while (i < 3) {
        yield await new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

(async () => {
     
    const uniqueValues = [...new Set([1, 2, 3, 4, 4, 5])];
    print('Unique Values:', uniqueValues);
    
     
    const { name, ...rest } = proxy;
    print('Destructured name:', name);
    print('Rest of the object:', rest);

     
    const promises = [];
    for await (let value of asyncGen()) {
        promises.push(value);
    }
    const results = await Promise.all(promises.map(val => Promise.resolve(val * 2)));
    print('Async Generator Results:', results);

     
    if (results.includes(4)) {
        const module = await import('./dynamicModule.js');
        module.dynamicFunction();
    }
})();

 
proxy.name = 'Updated JS';
print('Access updated name:', proxy.name);
print('Try accessing non-existent property:', proxy.nonExistent);
