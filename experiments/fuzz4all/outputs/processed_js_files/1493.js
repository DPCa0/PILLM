 

 
const loggerProxyHandler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' accessed.`);
        return Reflect.get(target, prop, receiver);
    },
    apply(target, thisArg, argumentsList) {
        print(`Method '${target.name}' invoked with arguments: [${argumentsList}].`);
        return Reflect.apply(target, thisArg, argumentsList);
    }
};

 
function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function processData() {
    const fetchData = new Proxy(function(url) {
        return new Promise((resolve) => setTimeout(() => resolve(`Fetched data from ${url}`), 1000));
    }, loggerProxyHandler);

    const data = await fetchData('https://api.example.com/data');
    print(data);
}

 
const fibProxy = new Proxy(fibonacciGenerator(5), loggerProxyHandler);
for (const num of fibProxy) {
    print(`Fibonacci: ${num}`);
}

 
processData().catch(err => console.error(err));
