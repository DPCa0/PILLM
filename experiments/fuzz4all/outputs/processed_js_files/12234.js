 

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const fibonacciProxyHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessed element at index ${prop}: ${target[prop]}`);
            return target[prop];
        }
        return undefined;
    }
};

const fibonacciSequence = [];
const fibProxy = new Proxy(fibonacciSequence, fibonacciProxyHandler);

 
const fibGen = fibonacci();
for (let i = 0; i < 10; i++) {
    fibProxy.push(fibGen.next().value);
}

 
async function fetchData(item) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Fetched data for ${item}`);
        }, 1000);
    });
}

 
async function fetchFibonacciData(sequence) {
    const fetchPromises = sequence.map(async (num) => {
        const data = await fetchData(num);
        print(data);
    });

    await Promise.all(fetchPromises);
}

 
fetchFibonacciData(fibProxy);
