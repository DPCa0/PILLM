class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function* fibonacciSequence(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

async function main() {
    const fibLimit = 100;
    const deferred = new Deferred();
    
     
    (async () => {
        await delay(2000);
        print("Async operation finished.");
        deferred.resolve("Operation completed.");
    })();
    
    print("Fibonacci sequence up to", fibLimit);
    for await (let num of fibonacciSequence(fibLimit)) {
        print(num);
    }
    
    print("Waiting for async operation to finish...");
    const result = await deferred.promise;
    print(result);
}

main().catch(console.error);
