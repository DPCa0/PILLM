 

 
function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function getFibonacciNumbers(count) {
    const fibGen = fibonacciSequence();
    const fibNumbers = [];
    
    for (let i = 0; i < count; i++) {
        fibNumbers.push(fibGen.next().value);
        await delay(500);  
    }

    return fibNumbers;
}

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
(async () => {
    try {
        const fibs = await getFibonacciNumbers(10);
        print('Fibonacci sequence:', fibs);
    } catch (error) {
        console.error('Error generating Fibonacci numbers:', error);
    }
})();

 
const target = { name: 'Advanced JS' };
const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : `No property ${prop}`),
    set: (obj, prop, value) => {
        print(`Setting value ${value} to property ${prop}`);
        obj[prop] = value;
        return true;
    }
};

const proxyObj = new Proxy(target, handler);

 
print(proxyObj.name);  
proxyObj.version = 'ES6+';
print(proxyObj.version);  
print(proxyObj.nonExistentProperty);  
