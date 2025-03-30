 
const memoizedFibonacci = (function() {
    const cache = new Map();
    function fib(n) {
        if (n < 2) return n;
        if (cache.has(n)) return cache.get(n);
        const result = fib(n - 1) + fib(n - 2);
        cache.set(n, result);
        return result;
    }
    return fib;
})();

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const target = { greeting: 'Hello, world!' };
const proxy = new Proxy(target, handler);

 
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2].map(num => num * 2);
const [first, ...rest] = combined;

 
print(memoizedFibonacci(10));   
proxy.greeting = 'Hi, universe!';
print(proxy.greeting);          
print(first, rest);             
fetchData('https://api.github.com').then(data => print(data));
