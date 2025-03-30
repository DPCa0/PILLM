 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property ${prop} does not exist`);
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const obj = new Proxy({a: 1, b: 2}, handler);

 
async function asyncOperation() {
    try {
        await new Promise((resolve, reject) => setTimeout(resolve, 1000));
        obj.a = 10;
        print(`After async operation, a: ${obj.a}`);
    } catch (error) {
        console.error(`Error in async operation: ${error.message}`);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generateId = idGenerator();
print(`Generated ID: ${generateId.next().value}`);

 
(async () => {
    let [first, second, ...rest] = [1, 2, 3, 4, 5];
    print(`First: ${first}, Second: ${second}, Rest: ${rest.join(", ")}`);

    await asyncOperation();
})();

 
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

print(`Map has key1: ${map.has('key1')}`);

const set = new Set([1, 2, 3, 4, 5]);
set.add(6);
print(`Set size: ${set.size}`);
