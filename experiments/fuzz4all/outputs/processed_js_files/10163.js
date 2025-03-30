 
const asyncOperation = (id, delay) => new Promise((resolve) => {
    setTimeout(() => resolve(`Operation ${id} completed after ${delay}ms`), delay);
});

 
const performOperations = async () => {
    const operations = [
        asyncOperation(1, 1000),
        asyncOperation(2, 2000),
        asyncOperation(3, 1500),
        asyncOperation(4, 500)
    ];

    print("Starting all operations...");

     
    const results = await Promise.allSettled(operations);
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            print(`Success: ${result.value}`);
        } else {
            print(`Failure: ${result.reason}`);
        }
    });

    print("All operations completed.");
};

 
(async () => {
    try {
        await performOperations();
    } catch (error) {
        console.error(`Error occurred: ${error.message}`);
    }
})();

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' accessed with value: ${target[prop]}`);
        return target[prop];
    }
};
const proxy = new Proxy(targetObject, handler);

 
print(proxy.a);
print(proxy.b);

 
function* fibonacciGenerator() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const fibGen = fibonacciGenerator();
print(`First Fibonacci: ${fibGen.next().value}`);
print(`Second Fibonacci: ${fibGen.next().value}`);
print(`Third Fibonacci: ${fibGen.next().value}`);

 
async function* fetchUrls(urls) {
    for (const url of urls) {
        const response = await fetch(url