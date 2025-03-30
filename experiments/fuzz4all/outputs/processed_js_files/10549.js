class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator() {
    for (let i = 0; i < 3; i++) {
        await wait(1000);
        yield i;
    }
}

async function main() {
    const deferred = new Deferred();
    
    const task = async () => {
        for await (let value of asyncGenerator()) {
            print(`Async Generator Value: ${value}`);
        }
        deferred.resolve('Task Completed!');
    };
    
    const timeout = setTimeout(() => {
        deferred.reject('Task Timed Out!');
    }, 5000);

    try {
        print(await Promise.race([task(), deferred.promise]));
    } catch (error) {
        console.error(error);
    } finally {
        clearTimeout(timeout);
    }
}

main().catch(console.error);
