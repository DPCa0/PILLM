 

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchFibonacci(limit) {
    const fibNumbers = [];
    for (let num of fibonacci(limit)) {
        fibNumbers.push(await Promise.resolve(num));  
    }
    return fibNumbers;
}

 
const handler = {
    get(target, property) {
        print(`Accessing property "${property}"`);
        return Reflect.get(target, property);
    }
};

 
(async () => {
    const limit = 10;
    const fibNumbers = await fetchFibonacci(limit);
    const proxy = new Proxy(fibNumbers, handler);

    print("Fibonacci Sequence:");
    for (let i = 0; i < limit; i++) {
        print(proxy[i]);  
    }
})();
