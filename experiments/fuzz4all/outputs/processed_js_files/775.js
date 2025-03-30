 

 
function* asyncGenerator() {
    yield delayLog('Step 1: Start process...', 1000);
    yield delayLog('Step 2: Intermediate step...', 2000);
    yield delayLog('Step 3: Almost done...', 1500);
    yield delayLog('Step 4: Process complete!', 1000);
}

 
function delayLog(message, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(message);
            resolve();
        }, delay);
    });
}

 
async function runAsyncGenerator(gen) {
    const iterator = gen();
    let result = iterator.next();
    while (!result.done) {
        await result.value;  
        result = iterator.next();
    }
}

 
const startAsyncProcess = async () => {
    try {
        print(`Starting async process at: ${new Date().toLocaleTimeString()}`);
        await runAsyncGenerator(asyncGenerator);
        print(`Async process finished at: ${new Date().toLocaleTimeString()}`);
    } catch (error) {
        console.error('Error during async process:', error);
    }
};

 
(async () => {
    print('Initiating asynchronous operations...');
    await startAsyncProcess();
    print('All operations completed.');
})();
