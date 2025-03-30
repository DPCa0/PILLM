 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fibProxy = new Proxy({}, {
    get: function(target, prop) {
        if (!isNaN(prop)) {
            return fibCache[prop] || (fibCache[prop] = [...Array(parseInt(prop) + 1)].map((_, i) => fibGen.next().value)[prop]);
        }
    }
});

 
const fibCache = new WeakMap();
const fibGen = fibonacci();

 
async function getFibonacciNumbers(indices) {
    const promises = indices.map(index => 
        new Promise(resolve => setTimeout(() => resolve(fibProxy[index]), Math.random() * 1000))
    );
    const results = await Promise.all(promises);
    return results;
}

 
(async function execute() {
    const indices = [5, 10, 15, 20, 25];
    print(`Fetching Fibonacci numbers for indices: ${indices.join(', ')}`);
    const fibNumbers = await getFibonacciNumbers(indices);
    print(`Fibonacci numbers: ${fibNumbers.join(', ')}`);
})();
