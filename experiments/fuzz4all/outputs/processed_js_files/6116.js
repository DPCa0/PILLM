 

 
function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const fetchData = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value % 2 === 0) {
                resolve(`Fetched even value: ${value}`);
            } else {
                reject(`Odd value encountered: ${value}`);
            }
        }, 1000);
    });
};

 
async function processFibonacci(limit) {
    const fibonacciSequence = fibonacciGenerator(limit);
    for (let value of fibonacciSequence) {
        try {
            const result = await fetchData(value);
            print(result);
        } catch (error) {
            console.error(error);
        }
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property '${property}'`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property '${property}' to ${value}`);
        target[property] = value;
    }
};

 
const fibonacciInfo = {
    start: 0,
    limit: 10
};

 
const proxiedFibonacciInfo = new Proxy(fibonacciInfo, handler);

 
proxiedFibonacciInfo.limit = 5;

 
processFibonacci(proxiedFibonacciInfo.limit);
