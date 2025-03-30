 

 
function* asyncGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('Resolved after 1s'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Resolved after 2s'), 2000));
    yield new Promise(resolve => setTimeout(() => resolve('Resolved after 3s'), 3000));
}

 
async function handleAsyncGenerator(gen) {
    for (let promise of gen) {
        print(await promise);
    }
}

 
const consoleProxy = new Proxy(console, {
    get(target, prop) {
        if (prop === 'log') {
            return (...args) => {
                const timestamp = new Date().toISOString();
                target.log(`[${timestamp}]`, ...args);
            };
        }
        return target[prop];
    }
});

 
async function run() {
     
    globalThis.console = consoleProxy;

    print("Starting process...");
    await handleAsyncGenerator(asyncGenerator());
    print("Process completed.");
}

 
run();
