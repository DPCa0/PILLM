 
function* fibonacciSequence(limit) {
    let a = 0, b = 1;
    while (limit--) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const fibonacciProxy = new Proxy(fibonacciSequence(10), {
    get(target, prop) {
        if (prop === Symbol.iterator) return () => target;
        if (prop === 'sum') {
            return [...target].reduce((acc, num) => acc + num, 0);
        }
        return undefined;
    }
});

 
async function calculate() {
    const result = await new Promise((resolve) => setTimeout(() => {
        const sum = fibonacciProxy.sum;  
        resolve(sum);
    }, 1000));

    return result;
}

 
const displayResult = async () => {
    const result = await calculate();
    print(`The sum of the first 10 Fibonacci numbers is: ${result}`);
};

displayResult();
