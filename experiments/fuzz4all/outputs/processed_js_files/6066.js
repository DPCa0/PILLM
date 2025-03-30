 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
function memoize(fn) {
    const cache = new Map();
    return async function (...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print('Fetching from cache:', key);
            return cache.get(key);
        }
        const result = await fn(...args);
        cache.set(key, result);
        return result;
    };
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Property accessed: ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Property set: ${String(prop)} = ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = { a: 1, b: 2 };
const proxiedObject = new Proxy(targetObject, handler);

 
const memoizedFetchData = memoize(fetchData);

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const { title } = await memoizedFetchData(url);
    print('Fetched title:', title);

    proxiedObject.a;
    proxiedObject.b = 3;
})();
