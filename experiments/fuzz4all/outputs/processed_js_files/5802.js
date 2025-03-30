class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

function asyncOperation(id) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(() => resolve(`Operation ${id} completed in ${delay}ms`), delay);
    });
}

async function* asyncGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield asyncOperation(i);
    }
}

async function runOperationsConcurrently(limit) {
    const deferred = new Deferred();
    
    (async () => {
        for await (let message of asyncGenerator(limit)) {
            print(message);
        }
        deferred.resolve('All operations completed');
    })();
    
    return deferred.promise;
}

(async () => {
    try {
        const result = await runOperationsConcurrently(5);
        print(result);
    } catch (error) {
        console.error('Error:', error);
    }
})();
