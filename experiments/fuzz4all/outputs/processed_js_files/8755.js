 

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const targetObject = {a: 1, b: 2};
const proxyObject = new Proxy(targetObject, handler);

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function displayFibonacci(n) {
    const fibGen = fibonacci();
    for (let i = 0; i < n; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        print(fibGen.next().value);
    }
}

 
async function main() {
    print("Start interacting with the Proxy object:");
    proxyObject.a = 10;
    print(proxyObject.a);
    print(proxyObject.b);

    print("\nDisplaying first 5 Fibonacci numbers asynchronously:");
    await displayFibonacci(5);
}

main();
