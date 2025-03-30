 
async function* asyncFibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        await new Promise(resolve => setTimeout(resolve, 50));  
    }
}

 
const fibonacciHandler = {
    get: function(target, prop) {
        print(`Accessed element ${prop}`);
        return target[prop];
    }
};

 
const transformArray = (arr, transformer) => arr.map(transformer);

 
(async () => {
    const limit = 10;
    const fibArray = [];

     
    for await (const num of asyncFibonacci(limit)) {
        fibArray.push(num);
    }

     
    const proxyFibArray = new Proxy(fibArray, fibonacciHandler);

     
    const squaredFibArray = transformArray(proxyFibArray, num => num ** 2);

    print('Squared Fibonacci Numbers:', squaredFibArray);
})();
