 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fibonacciHandler = {
    get(target, property, receiver) {
        print(`Accessing property '${property}'`);
        return Reflect.get(...arguments);
    },
    apply(target, thisArg, argumentsList) {
        print(`Called function with arguments ${argumentsList}`);
        return target.apply(thisArg, argumentsList);
    }
};

 
const proxiedFibonacci = new Proxy(fibonacci, fibonacciHandler);

 
const sumFibonacci = (n, iterator = proxiedFibonacci(), sum = 0, ...accumulated) => {
    if (accumulated.length >= n) return sum;
    const { value, done } = iterator.next();
    return sumFibonacci(n, iterator, sum + value, ...accumulated, value);
};

 
async function fetchAndLog(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error(`Fetch error: ${error}`);
    }
}

 
print(`Sum of first 10 Fibonacci numbers: ${sumFibonacci(10)}`);
fetchAndLog('https://api.github.com');
