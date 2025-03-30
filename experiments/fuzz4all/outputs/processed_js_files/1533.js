 

function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const fibonacciProxy = new Proxy(fibonacciSequence(), {
    get(target, prop) {
        if (prop === 'nextFibonacci') {
            return target.next().value;
        }
        return undefined;
    }
});

function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const mockData = { data: `Data from ${url}` };
            resolve(mockData);
        }, 1000);
    });
}

async function main() {
    print(`First Fibonacci: ${fibonacciProxy.nextFibonacci}`);
    print(`Second Fibonacci: ${fibonacciProxy.nextFibonacci}`);
    
    try {
        const data1 = await fetchData('https://api.example.com/endpoint1');
        print(data1.data);

        const data2 = await fetchData('https://api.example.com/endpoint2');
        print(data2.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

main();
