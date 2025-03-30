class Logger {
    static instance;
    constructor() {
        if (Logger.instance) return Logger.instance;
        this.logs = [];
        Logger.instance = this;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        print(`${timestamp} - ${message}`);
    }
}

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const complexCalculation = memoize((n) => {
    if (n <= 1) return 1;
    return n * complexCalculation(n - 1);
});

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

function* numberGenerator() {
    let num = 1;
    while (true) {
        yield num++;
    }
}

async function processAsyncTasks(tasks) {
    const results = await Promise.all(tasks.map(async (task) => {
        try {
            const result = await task();
            logger.log(`Task succeeded: ${result}`);
            return result;
        } catch (error) {
            logger.log(`Task failed: ${error.message}`);
            return null;
        }
    }));
    return results.filter(Boolean);
}

const logger = new Logger();

(async () => {
    logger.log('Application start');
    
    logger.log('Computing complex calculation for 5');
    print(complexCalculation(5));

    logger.log('Fetching data from API');
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        logger.log(`Fetched data: ${JSON.stringify(data)}`);
    } catch (error) {
        logger.log(`Failed to fetch data: ${error.message}`);
    }

    const numbers = numberGenerator();
    print(numbers.next().value);
    print(numbers.next().value);
    print(numbers.next().value);

    const tasks = [
        () => Promise.resolve('Task 1 completed'),
        () => Promise.reject(new Error('Task 2 failed')),
        () => Promise.resolve('Task 3 completed'),
    ];
    
    const taskResults = await processAsyncTasks(tasks