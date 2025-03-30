 
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

 
const logger = (obj) => new Proxy(obj, {
    get(target, prop) {
        print(`Accessing property ${String(prop)}`);
        return Reflect.get(target, prop);
    }
});

 
const uniqueSymbol = Symbol('unique');

const complexObject = {
    [uniqueSymbol]: 'Value for unique symbol',
    regularKey: 'Regular value'
};

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

 
const fibonacci = memoize((n) => (n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)));

const loggedObj = logger(complexObject);
print(loggedObj[uniqueSymbol]);
print(loggedObj.regularKey);

 
fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data => print(data));

 
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
    'https://jsonplaceholder.typicode.com/invalid-url'  
];

Promise.allSettled(urls.map(url => fetchData(url)))
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                print(`Result from URL ${urls[index]}:`, result.value);
            } else {
                console.error(`Failed to fetch URL ${urls[index]}:`, result.reason);
            }
        });
    });
