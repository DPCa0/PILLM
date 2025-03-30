 

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return target[prop];
        } else {
            throw new Error(`Property ${prop} not found`);
        }
    }
};

const logger = new Proxy({
    info: (msg) => console.log(`INFO: ${msg}`),
    warn: (msg) => console.warn(`WARN: ${msg}`),
    error: (msg) => console.error(`ERROR: ${msg}`)
}, handler);

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchDataAndLog() {
    logger.info("Starting data fetch...");

    const simulateAsyncFetch = new Promise((resolve) => {
        setTimeout(() => resolve('Data fetched successfully!'), 2000);
    });

    try {
        const result = await simulateAsyncFetch;
        logger.info(result);

        const fib = fibonacci();
        logger.info("Fibonacci sequence:");
        for (let i = 0; i < 5; i++) {
            logger.info(fib.next().value);
        }

    } catch (error) {
        logger.error(error.message);
    }
}

fetchDataAndLog();
