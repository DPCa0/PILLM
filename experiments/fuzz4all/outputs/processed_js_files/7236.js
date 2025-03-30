 

 
async function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        await new Promise(resolve => setTimeout(resolve, 100));  
    }
}

 
const fibonacciLogger = {
    get: (target, prop) => {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting property '${prop}' to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const fibObj = new Proxy({ current: 0 }, fibonacciLogger);

 
async function main() {
    fibObj.current = 'Fibonacci sequence up to 100:';
    print(fibObj.current);

    for await (const num of fibonacci(100)) {
        print(num);
    }
}

 
main();
