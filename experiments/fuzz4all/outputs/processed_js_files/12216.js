 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function asyncFibonacciSum(n) {
    const fibIterator = fibonacci(n);
    let sum = 0;
    for (let num of fibIterator) {
         
        sum = await new Promise(resolve => 
            setTimeout(() => resolve(sum + num), 100)
        );
    }
    return sum;
}

 
const loggerHandler = {
    get(target, prop, receiver) {
        print(`Accessed property: ${prop}`);
        return Reflect.get(...arguments);
    }
};

 
const loggedObject = new Proxy({ name: "Fibonacci Calculator", version: 1.0 }, loggerHandler);

 
(async () => {
    print(`Using ${loggedObject.name} v${loggedObject.version}`);
    const sum = await asyncFibonacciSum(10);
    print(`Sum of the first 10 Fibonacci numbers is: ${sum}`);
})();
