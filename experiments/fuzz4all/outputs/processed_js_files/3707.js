 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

 
async function fetchMultipleData(urls) {
    const fetchPromises = urls.map(url => fetchData(url));
    const data = await Promise.all(fetchPromises);
    return data;
}

 
const fibonacciHandler = {
    get: (target, property) => {
        print(`Accessing Fibonacci index: ${property}`);
        return target[property];
    }
};

 
async function main() {
    const fibLimit = 100;
    const fibSequence = Array.from(fibonacci(fibLimit));
    const fibProxy = new Proxy(fibSequence, fibonacciHandler);

    print("Fibonacci sequence up to", fibLimit, ":", fibProxy);

    const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    const data = await fetchMultipleData(urls);

    print("Fetched data:", data);
}

 
main();
