 
const asyncOperation = (msg, delay) => new Promise(resolve => setTimeout(() => resolve(msg), delay));

 
async function* asyncGenerator() {
    yield await asyncOperation('First async operation', 1000);
    yield await asyncOperation('Second async operation', 2000);
    yield await asyncOperation('Third async operation', 1500);
}

 
async function runAsyncOperations() {
    const results = [];
    for await (let result of asyncGenerator()) {
        results.push(result);
    }
    return results;
}

 
const createObjectWithLogging = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop);
        },
        set(target, prop, value) {
            print(`Setting property ${prop} to ${value}`);
            return Reflect.set(target, prop, value);
        }
    });
};

 
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const combinedObj = { ...obj1, ...obj2 };

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];

 
(async () => {
    const loggingObject = createObjectWithLogging({ x: 10, y: 20 });
    loggingObject.x = 30;
    print(`Logging object x: ${loggingObject.x}`);
    
    print('Combined object:', combinedObj);
    print('Combined array:', combinedArray);

    const asyncResults = await runAsyncOperations();
    print('Async operations results:', asyncResults);

    const map = new Map([
        ['a', 1],
        ['b', 2]
    ]);

    map.set('c', 3);
    for (let [key, value] of map) {
        print(`Map Key: ${key}, Value: ${value}`);
    }
})();
