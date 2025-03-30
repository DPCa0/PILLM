class Logger {
    static #instance = null;
    
    constructor() {
        if (Logger.#instance) {
            return Logger.#instance;
        }
        this.logs = [];
        Logger.#instance = this;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        print(`[${timestamp}] ${message}`);
    }
    
    *[Symbol.iterator]() {
        for (const log of this.logs) {
            yield log;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function complexTask() {
    const logger = new Logger();
    for (let i = 0; i < 3; i++) {
        logger.log(`Starting task ${i + 1}`);
        await delay(1000);
        logger.log(`Finished task ${i + 1}`);
    }
    logger.log('All tasks completed');
}

async function main() {
    await complexTask();
    const logger = new Logger();
    print('\n--- Log History ---');
    for (const entry of logger) {
        print(`${entry.timestamp}: ${entry.message}`);
    }
}

main();
