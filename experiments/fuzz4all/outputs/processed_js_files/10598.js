 
const target = { secret: 'shhh', value: 42 };
const handler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' accessed.`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Property '${prop}' set to '${value}'.`);
        return Reflect.set(target, prop, value);
    }
};
const proxy = new Proxy(target, handler);

 
print(proxy.value);  
proxy.value = 100;         
print(proxy.value);  

 
async function* dataStream() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

(async function processData() {
    for await (let num of dataStream()) {
        print(`Processed number: ${num}`);
    }
})();

 
const map = new Map();
const weakMap = new WeakMap();

let obj1 = { key: 'obj1' };
let obj2 = { key: 'obj2' };

map.set(obj1, 'Hello');
weakMap.set(obj2, 'World');

print(map.get(obj1));  

 
obj2 = null; 

 
const asyncIterable = {
    [Symbol.asyncIterator]: () => {
        let i = 0;
        return {
            next: () => {
                if (i < 5) {
                    return Promise.resolve({ value: i++, done: false });
                } else {
                    return Promise.resolve({ done: true });
                }
            }
        };
    }
};

(async function runAsyncIterable() {
    for await (let num of asyncIterable) {
        print(`Async iterated number: ${num}`);
    }
})();
