 
const memoize = (fn => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
})();

 
const fibonacci = memoize(n => {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fibonacciSequence(n) {
    for (let i = 0; i < n; i++) {
        await delay(200);  
        yield fibonacci(i);
    }
}

(async () => {
    const sequence = fibonacciSequence(10);
    for await (const num of sequence) {
        print(num);
    }
})();

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

const user = new Proxy({ name: 'John Doe', age: 30 }, handler);

print(user.name);  
print(user.age);   

 
const colors = ['red', 'green', 'blue'];
const [primaryColor, ...otherColors] = colors;
print(primaryColor);  
print(otherColors);   

 
const iterable = {
    [Symbol.iterator]() {
        let step = 0;
        return {
            next() {
                step++;
                if (step <= 3) {
                    return { value: `Step ${step}`, done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const step of iterable) {
    print(step);
}
