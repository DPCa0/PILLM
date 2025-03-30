 
async function* fibonacciGenerator(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        await new Promise(resolve => setTimeout(resolve, 100));  
    }
}

 
async function processFibonacci(n) {
    try {
        const numbers = [...fibonacciGenerator(n)];
        const results = await Promise.all(numbers.map(async num => {
            const doubled = num * 2;
             
            await new Promise(resolve => setTimeout(resolve, 50));
            return doubled;
        }));

        return results;
    } catch (error) {
        console.error("Error processing Fibonacci numbers:", error);
    }
}

 
const loggerHandler = {
    get: (target, property, receiver) => {
        print(`Getting property ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set: (target, property, value, receiver) => {
        print(`Setting property ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

const data = new Proxy({fibNumbers: []}, loggerHandler);

(async () => {
    data.fibNumbers = await processFibonacci(10);
    print("Processed Fibonacci numbers:", data.fibNumbers);
})();
