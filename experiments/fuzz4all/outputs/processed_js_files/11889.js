 
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

 
const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const person = {
    name: 'Alice',
    age: 30,
};

const handler = {
    get: (target, property, receiver) => {
        print(`Accessed property: ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set: (target, property, value, receiver) => {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    },
};

const proxiedPerson = new Proxy(person, handler);

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Fetched data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
print('Fibonacci(10):', fibonacci(10));

proxiedPerson.name = 'Bob';
print('Person name:', proxiedPerson.name);

fetchData('https://jsonplaceholder.typicode.com/todos/1');
