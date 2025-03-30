 
async function* asyncGenerator() {
    let count = 0;
    while (count < 5) {
        yield new Promise(resolve => setTimeout(() => resolve(count++), 1000));
    }
}

function complexPromise(value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            value % 2 === 0 ? resolve(`Resolved: ${value}`) : reject(`Rejected: ${value}`);
        }, 500);
    });
}

(async () => {
    const results = [];
    try {
        for await (let value of asyncGenerator()) {
            try {
                const result = await complexPromise(value);
                results.push(result);
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    } finally {
        print('Final Results:', results);
    }
})();

 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}: ${target[prop]}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObj = { prop1: 10, prop2: 20 };
const proxyObj = new Proxy(targetObj, handler);

proxyObj.prop1 = 30;
print(proxyObj.prop1);

 
const obj = { name: 'Advanced JS', version: 6 };
Reflect.set(obj, 'version', 7);
print(Reflect.get(obj, 'version'));

 
const uniqueKey = Symbol('unique');
obj[uniqueKey] = 'Symbol property';
print(obj[uniqueKey]);

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

const weakMap = new WeakMap();
const keyObj = {};
weakMap.set(keyObj, 'WeakMapValue');

print(map.get('key1'));
print(weakMap.get(keyObj));
