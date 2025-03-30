class AsyncLogger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        print(`[${timestamp}]: ${message}`);
    }

    async processLogs() {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        return this.logs.map(log => `Processed: ${log.message} at ${log.timestamp}`);
    }
}

const LoggerProxy = new Proxy(new AsyncLogger(), {
    get(target, prop) {
        if (prop === 'log') {
            return new Proxy(target[prop], {
                apply(func, thisArg, args) {
                    print('Logging via proxy...');
                    return Reflect.apply(func, thisArg, args);
                }
            });
        }
        return Reflect.get(target, prop);
    }
});

(async function main() {
    LoggerProxy.log('Hello, advanced JavaScript!');
    LoggerProxy.log('Exploring Proxy and Async/Await...');
    
    print('Waiting for logs to be processed...');
    const processedLogs = await LoggerProxy.processLogs();
    
    processedLogs.forEach(log => print(log));
})();
