 
function* numberGenerator() {
    let number = 0;
    while (true) {
        yield number++;
    }
}

 
async function asyncCounter() {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const asyncIterable = {
        [Symbol.asyncIterator]() {
            return {
                async next() {
                    await sleep(1000);  
                    return { value: Math.random(), done: false };  
                }
            };
        }
    };

    for await (const number of asyncIterable) {
        print(`Random number: ${number.toFixed(3)}`);
        if (number > 0.9) break;  
    }
}

 
const targetObj = { hello: 'world' };
const handler = {
    set(obj, prop, value) {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxyObj = new Proxy(targetObj, handler);
proxyObj.hello = 'JavaScript';
proxyObj.newProperty = 'Advanced Features';

 
const complexSet = new Set([1, 2, 2, 3, 4]);
const complexMap = new Map([['key1', 'value1'], ['key2', 'value2']]);

print('Set contents:', [...complexSet]);
print('Map contents:', [...complexMap.entries()]);

 
function manipulateStructures(set, map) {
    const uniqueArray = [...set];
    map.set('key3', 'value3');
    print('Updated Array from Set:', uniqueArray);
    print('Updated Map contents:', [...map.entries()]);
}

manipulateStructures(complexSet, complexMap);

 
asyncCounter();

 
const weakMap = new WeakMap();
let obj = { data: 123 };
weakMap.set(obj, 'associatedValue');
print('WeakMap has obj:', weakMap.has(obj));

obj = null;  

setTimeout(() => {
    print('WeakMap has obj after GC:', weakMap.has(obj));  
}, 5000);
