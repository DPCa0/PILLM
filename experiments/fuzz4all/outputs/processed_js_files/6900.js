 
function* squareNumbers() {
    for (let i = 1; i <= 5; i++) {
        yield i * i;
    }
}

 
const target = { a: 1, b: 2, c: 3 };
const handler = {
    get: function(obj, prop) {
        print(`Property '${prop}' accessed.`);
        return obj[prop];
    },
    set: function(obj, prop, value) {
        print(`Property '${prop}' set to ${value}.`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
let { a, b } = proxy;
proxy.c = 10;

 
async function asyncFunction() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Async operation complete'), 1000);
    });

    print('Waiting for the promise to resolve...');
    const result = await promise;
    print(result);
}

 
for (const square of squareNumbers()) {
    print(`Square: ${square}`);
}

 
const map = new Map();
const key1 = { id: 1 };
const key2 = { id: 2 };
map.set(key1, 'Value associated with key1');
map.set(key2, 'Value associated with key2');

for (let [key, value] of map.entries()) {
    print(`Key: ${JSON.stringify(key)}, Value: ${value}`);
}

 
asyncFunction();
