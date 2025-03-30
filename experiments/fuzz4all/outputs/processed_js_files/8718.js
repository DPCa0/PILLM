 
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print(`Fetching from cache for args: ${key}`);
            return cache.get(key);
        }
        print(`Calculating result for args: ${key}`);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
const sumAndProduct = ({ a = 1, b = 1 }, ...rest) => {
    const sum = rest.reduce((acc, num) => acc + num, a + b);
    const product = rest.reduce((acc, num) => acc * num, a * b);
    return { sum, product };
};

 
const memoizedSumAndProduct = memoize(({ a, b }, ...rest) => {
    const { sum, product } = sumAndProduct({ a, b }, ...rest);
    return `Sum: ${sum}, Product: ${product}`;
});

 
const obj1 = { a: 2, b: 3 };
const obj2 = { c: 4, d: 5 };
const arr = [6, 7, 8];

const { c, ...restObj } = obj2;
print(memoizedSumAndProduct({ ...obj1, ...restObj }, ...arr));
print(memoizedSumAndProduct({ ...obj1, ...restObj }, ...arr));  

 
const asyncCalculation = async (params) => {
    try {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => resolve(memoizedSumAndProduct(params)), 1000);
        });
        print(`Async Result: ${result}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

 
asyncCalculation({ a: 5, b: 10 }, 2, 3);
