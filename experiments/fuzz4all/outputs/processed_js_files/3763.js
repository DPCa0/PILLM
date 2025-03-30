class AsyncLogger {
    #logs = [];
    
    constructor() {
        this.timeStarted = Date.now();
    }

    logAsync = async (message) => {
        this.#logs.push(await this.#formatLog(message));
    };

    #formatLog(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const timestamp = new Date().toISOString();
                resolve(`[${timestamp}] ${message}`);
            }, 100);
        });
    }

    *[Symbol.iterator]() {
        for (let log of this.#logs) {
            yield log;
        }
    }

    static async executeWithLogging(fn) {
        const logger = new AsyncLogger();
        await fn(logger);
        return logger;
    }
}

(async () => {
    const logger = await AsyncLogger.executeWithLogging(async (log) => {
        await log.logAsync('Initializing process...');
        await new Promise(resolve => setTimeout(resolve, 300));  
        await log.logAsync('Process running...');
        await new Promise(resolve => setTimeout(resolve, 200));  
        await log.logAsync('Process finished.');
    });

    for (let log of logger) {
        print(log);
    }
})();
