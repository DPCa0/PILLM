 
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

 
const complexCalculation = memoize((n) => {
    if (n < 2) return n;
    return complexCalculation(n - 1) + complexCalculation(n - 2);
});

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error:', error);
        return null;
    }
};

 
class PrivateCounter {
    #count = 0;   

    increment() {
        this.#count++;
    }

    get value() {
        return this.#count;
    }
}

 
const obj = { a: 1, b: 2 };
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};
const proxyObj = new Proxy(obj, handler);

 
print('Complex Calculation Result:', complexCalculation(10));   
const privateCounter = new PrivateCounter();
privateCounter.increment();
print('Private Counter Value:', privateCounter.value);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1').then(data => print('Fetched Data:', data));

 
print(proxyObj.a);
print(proxyObj.b);
