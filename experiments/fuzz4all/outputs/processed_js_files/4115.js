class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

async function* asyncGenerator() {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

async function complexFlow() {
    const deferred = new Deferred();
    
     
    const timeout = setTimeout(() => deferred.reject(new Error("Operation timed out")), 1000);

    try {
        const results = [];
        for await (const num of asyncGenerator()) {
            print(`Yielded: ${num}`);
            results.push(num);

             
            if (num === 4) {
                clearTimeout(timeout);
                deferred.resolve(results);
            }
        }

        const finalResult = await Promise.race([
            deferred.promise,
            Promise.reject(new Error("Another error"))
        ]);

        print('Final Result:', finalResult);
    } catch (error) {
        console.error('Caught Error:', error.message);
    }
}

complexFlow();
