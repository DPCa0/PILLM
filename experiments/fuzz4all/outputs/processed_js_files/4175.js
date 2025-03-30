 
async function* fibonacciGen(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield new Promise((resolve) => setTimeout(() => resolve(curr), 100));
        [prev, curr] = [curr, prev + curr];
    }
}

 
const doubleHandler = {
    get(target, prop) {
        if (typeof target[prop] === 'function') {
            return (...args) => target[prop](...args).then(x => x * 2);
        }
        return Reflect.get(target, prop);
    }
};

 
const doubledFibonacciGen = new Proxy(fibonacciGen, doubleHandler);

 
(async () => {
    const fibonacciSequence = doubledFibonacciGen(10);
    for await (const num of fibonacciSequence) {
        print(num);  
    }
})();

 
const symbol = Symbol('uniqueNumbers');
const uniqueNumbersSet = new Set();
const fibonacciMap = new Map();

 
for (let i = 0; i < 10; i++) {
    const num = i * 3;
    fibonacciMap.set(Symbol(`entry-${i}`), num);
    uniqueNumbersSet.add(num);
}

 
print('Unique Numbers:', [...uniqueNumbersSet]);
print('Count:', uniqueNumbersSet.size);
