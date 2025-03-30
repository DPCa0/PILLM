 
'use strict';

 
async function* asyncGenerator(max) {
    let i = 0;
    while (i < max) {
        yield new Promise(resolve => setTimeout(() => resolve(i++), 1000));
    }
}

async function processAsync(max) {
    const results = [];
    for await (let num of asyncGenerator(max)) {
        results.push(num);
    }
    return results;
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' accessed.`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Property '${prop}' set to '${value}'.`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
Reflect.set(proxy, 'c', 3);
print('Object values:', Reflect.ownKeys(proxy).map(key => proxy[key]));

 
const set = new Set([1, 2, 3]);
const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);

 
const [firstKey, firstValue] = map.entries().next().value;
print(`First entry in map: ${firstKey} => ${firstValue}`);

 
function tag(strings, ...values) {
    return strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

print(tag`This is a \nnewline test with variable ${firstValue}.`);

 
(async () => {
    print('Starting processing...');
    const nums = await processAsync(5);
    print('Processed numbers:', nums);
    set.add(nums.length);
    print('Set values:', [...set]);
})();
