 
const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

 
const memoize = (func) => {
    const cache = new Map();
    return async (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print('Returning cached result');
            return cache.get(key);
        }
        const result = await func(...args);
        cache.set(key, result);
        return result;
    };
};

 
const createLoggingProxy = (target) => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessing property '${prop}'`);
            return prop in obj ? obj[prop] : undefined;
        },
    });
};

 
const data = createLoggingProxy({ name: 'John Doe', age: 30 });
print(data.name);  
print(data.age);   

 
(async () => {
    const memoizedFetch = memoize(fetchData);
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    try {
        const todo = await memoizedFetch(url);
        print('Fetched Todo:', todo);

         
        const cachedTodo = await memoizedFetch(url);
        print('Cached Todo:', cachedTodo);
    } catch (error) {
        console.error('Error:', error);
    }
})();
