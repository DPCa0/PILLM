 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fibProxyHandler = {
    get(target, prop, receiver) {
        print(`Accessing property ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

const fibGenerator = fibonacci();
const fibProxy = new Proxy(fibGenerator, fibProxyHandler);

 
function fibTag(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const num = values[i - 1];
        const formattedNum = num !== undefined ? num.toLocaleString() : '';
        return result + string + formattedNum;
    }, '');
}

 
async function displayFibonacci(count) {
    print("Starting Fibonacci sequence:");
    for (let i = 0; i < count; i++) {
        const num = await new Promise(resolve => setTimeout(() => resolve(fibProxy.next().value), 500));
        print(fibTag`Fibonacci number ${i + 1}: ${num}`);
    }
}

 
displayFibonacci(10);
