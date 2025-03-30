 

 
function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function getFibonacciNumbers(count) {
    const fibGen = fibonacciSequence();
    const numbers = [];
    
    for (let i = 0; i < count; i++) {
        numbers.push(fibGen.next().value);
    }

     
    return new Promise((resolve) => {
        setTimeout(() => resolve(numbers), 1000);
    });
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop, receiver);
    }
};

 
(async () => {
    const fibonacciNumbers = await getFibonacciNumbers(10);
    const proxy = new Proxy(fibonacciNumbers, handler);

     
    print(`First Fibonacci number: ${proxy[0]}`);
    print(`Fifth Fibonacci number: ${proxy[4]}`);
    print(`Tenth Fibonacci number: ${proxy[9]}`);
})();
