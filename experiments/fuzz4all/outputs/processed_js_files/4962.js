const delay = ms => new Promise(res => setTimeout(res, ms));

 
function* fibonacci(n) {
    let a = 0, b = 1, count = 0;
    while (count < n) {
        yield a;
        [a, b] = [b, a + b];
        count++;
    }
}

 
async function displayFibonacci(n) {
    print(`Displaying first ${n} Fibonacci numbers:`);
    const fibGen = fibonacci(n);

    for (const num of fibGen) {
        await delay(500);  
        print(num);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Property '${prop}' set to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const fibonacciNumbers = new Proxy({ count: 10 }, handler);

 
(async () => {
    await displayFibonacci(fibonacciNumbers.count);
})();
