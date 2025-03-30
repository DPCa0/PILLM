 

 
const uniqueOperation = Symbol('uniqueOperation');

 
const logger = {
    get(target, prop) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting property "${prop}" to "${value}"`);
        return Reflect.set(...arguments);
    }
};

const data = new Proxy({ count: 0 }, logger);

 
function* countGenerator(target, step = 1) {
    while (target.count < 10) {
        target.count += step;
        yield target.count;
    }
}

 
async function countAsync(target) {
    const generator = countGenerator(target);
    for (let value of generator) {
        print(`Counted to: ${value}`);
        await new Promise(resolve => setTimeout(resolve, 1000));  
    }
    return target.count;
}

 
data[uniqueOperation] = async function() {
    const result = await countAsync(this);
    print(`Final count is: ${result}`);
};

 
data[uniqueOperation]();
