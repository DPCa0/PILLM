 

 
function* promiseGenerator() {
    let delay = 100;
    for (let i = 1; i <= 5; i++) {
        yield new Promise((resolve) => setTimeout(() => resolve(`Result ${i}`), delay));
        delay += 100;
    }
}

 
function closureCounter(initialValue = 0) {
    let count = initialValue;
    return {
        increment: (value) => count += value,
        getCount: () => count
    };
}

 
async function runAsyncProcess() {
    const counter = closureCounter();
    const generator = promiseGenerator();

    for (let promise of generator) {
        const result = await promise;
        print(result);
        counter.increment(1);
        print(`Count: ${counter.getCount()}`);
    }
}

 
runAsyncProcess().catch(console.error);
