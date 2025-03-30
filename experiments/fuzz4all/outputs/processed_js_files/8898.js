 

 
function asyncOperation(value, delay) {
    return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

 
async function* asyncGenerator() {
    const values = [1, 2, 3, 4, 5];
    for (const value of values) {
        yield await asyncOperation(value * 2, 500);
    }
}

 
const handler = {
    get: function (target, prop, receiver) {
        print(`Getting property ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function (target, prop, value, receiver) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
const { a, b } = proxyObject;
print(a, b);

async function processGenerator() {
     
    let [x, y] = [5, 10];
    [x, y] = [y, x];
    print(`Swapped: x = ${x}, y = ${y}`);

    print('Processed values from async generator:');
    for await (const value of asyncGenerator()) {
        print(value);
    }
}

processGenerator();
