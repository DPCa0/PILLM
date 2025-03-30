const deepClone = (obj, map = new WeakMap()) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    if (map.has(obj)) return map.get(obj);

    const clone = Array.isArray(obj) ? [] : {};
    map.set(obj, clone);

    Reflect.ownKeys(obj).forEach(key => {
        clone[key] = deepClone(obj[key], map);
    });

    return clone;
};

const asyncGenerator = async function* (arr) {
    for (const item of arr) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield item * 2;
    }
};

const main = async () => {
    const data = { a: 1, b: { c: [2, 3, 4] }, d: new Date() };
    const clonedData = deepClone(data);

    print('Original:', data);
    print('Cloned:', clonedData);

    print('Async generator output:');
    for await (const value of asyncGenerator([1, 2, 3])) {
        print(value);
    }
};

main();
