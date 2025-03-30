 
const fetchData = () => new Promise(resolve => setTimeout(() => {
    const data = { id: 1, name: 'Advanced JavaScript' };
    resolve(data);
}, 1000));

 
async function* dataGenerator() {
    for (let i = 0; i < 3; i++) {
        const data = await fetchData();
        yield { ...data, iteration: i };
    }
}

 
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
const multiply = x => y => x * y;

 
const handler = {
    get: (target, prop) => (prop in target ? target[prop] : `No property: ${prop}`),
    set: (target, prop, value) => {
        if (typeof value === 'number') {
            target[prop] = value;
            return true;
        }
        print('Value must be a number');
        return false;
    }
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
const main = async () => {
    print('Memoized Multiply:', memoize(multiply(5))(10));  
    print('Proxy Get:', proxyObject.a);  
    proxyObject.a = 42;
    print('Proxy Set:', proxyObject.a);  

     
    const gen = dataGenerator();
    for await (const data of gen) {
        print('Fetched Data:', data);
    }
};

main();
