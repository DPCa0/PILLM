 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const target = { message: "Hello, Fibonacci!" };
const handler = {
    get: function(obj, prop) {
        print(`Property '${prop}' was accessed.`);
        return obj[prop];
    }
};
const proxy = new Proxy(target, handler);

print(proxy.message);

 
async function runFibonacci() {
    const fibSequence = [...fibonacci(10)];
    const promises = fibSequence.map(num => new Promise(resolve => {
        setTimeout(() => resolve(num), 1000);
    }));

    const results = await Promise.all(promises);
    print('Fibonacci Sequence:', results);
}

runFibonacci();
