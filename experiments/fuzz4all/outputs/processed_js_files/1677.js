 
function* fibonacciSequence(maxValue) {
    let [prev, curr] = [0, 1];
    while (curr <= maxValue) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const fibonacciHandler = {
    get: function(target, property) {
        print(`Accessing property "${property}"`);
        return target[property];
    }
};

 
const fibSequenceProxy = new Proxy(fibonacciSequence, fibonacciHandler);

 
const fibonacciArray = [...fibSequenceProxy(100)];

 
async function asyncProcessFibonacci(array) {
     
    const results = await Promise.all(array.map(num => {
        return new Promise(resolve => {
            setTimeout(() => {
                print(`Processed: ${num}`);
                resolve(num * 2);  
            }, num * 10);  
        });
    }));
    return results;
}

 
(async () => {
    const processedResults = await asyncProcessFibonacci(fibonacciArray);
    print(`Final Results: ${processedResults.join(', ')}`);
})();
