class AsyncLogger {
    #logBuffer = [];
    
    constructor(maxSize = 10) {
        this.maxSize = maxSize;
    }

    async log(message) {
        this.#logBuffer.push({ message, timestamp: new Date() });
        if (this.#logBuffer.length >= this.maxSize) {
            await this.flush();
        }
    }

    async flush() {
        while (this.#logBuffer.length > 0) {
            const logItem = this.#logBuffer.shift();
            print(`[${logItem.timestamp.toISOString()}]: ${logItem.message}`);
            await new Promise(resolve => setTimeout(resolve, 100));  
        }
    }
}

const makeLoggerProxy = (loggerInstance) => {
    return new Proxy(loggerInstance, {
        get(target, prop, receiver) {
            if (typeof target[prop] === 'function') {
                return (...args) => {
                    print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
                    return target[prop].apply(receiver, args);
                };
            }
            return Reflect.get(target, prop, receiver);
        }
    });
};

const logger = makeLoggerProxy(new AsyncLogger(3));

(async () => {
    await Promise.all([
        logger.log('User logged in'),
        logger.log('User navigated to dashboard'),
        logger.log('User logged out'),
        logger.log('User signed up'),
    ]);
})();
