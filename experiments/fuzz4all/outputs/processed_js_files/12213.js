class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* numberStream(max) {
    for (let i = 1; i <= max; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 100 * i));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function processStream(generator) {
    const results = [];
    for await (const num of generator) {
        results.push(num * 2);
        print(`Processed: ${num}`);
    }
    return results;
}

async function executeComplexTask() {
    const deferred = new Deferred();
    
     
    if (typeof Worker !== 'undefined') {
        const worker = new Worker(URL.createObjectURL(new Blob([`
            self.onmessage = function(e) {
                const result = e.data * e.data;
                self.postMessage(result);
            }
        `], { type: 'text/javascript' })));
        
        worker.onmessage = (e) => {
            print(`Worker processed square: ${e.data}`);
            deferred.resolve(e.data);
            worker.terminate();
        };
        
        worker.postMessage(10);
    } else {
        setTimeout(() => {
            const result = 10 * 10;
            print(`Fallback processed square: ${result}`);
            deferred.resolve(result);
        }, 1000);
    }
    
    const stream = numberStream(5);
    const processedResults = await processStream(stream);
    
    const workerResult = await deferred.promise;
    print(`Worker result: ${workerResult}`);
    
    print(`Processed results: ${processedResults}`);
}

executeComplexTask();
