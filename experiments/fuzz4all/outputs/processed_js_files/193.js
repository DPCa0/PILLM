 

function* fibonacciGenerator(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function asyncFibonacci(n) {
    const fibonacciSequence = [];
    const generator = fibonacciGenerator(n);

    for (const num of generator) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        fibonacciSequence.push(num);
    }
    return fibonacciSequence;
}

const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        } else {
            return `Property "${prop}" does not exist on the Fibonacci object.`;
        }
    }
};

async function run() {
    const fibObj = await asyncFibonacci(10);
    const proxyFibObj = new Proxy(fibObj, handler);

    print("Fibonacci sequence up to 10 terms:");
    for (let i = 0; i < 10; i++) {
        print(proxyFibObj[i]);  
    }

    print(proxyFibObj[10]);  
}

run();
