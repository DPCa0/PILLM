 
const loggerSymbol = Symbol('logger');

class Logger {
    constructor() {
        this[loggerSymbol] = [];
    }

    log(message) {
        this[loggerSymbol].push(message);
        print(`Logged: ${message}`);
    }

    async processLogs() {
        await new Promise(resolve => setTimeout(resolve, 1000));
        this[loggerSymbol].forEach(log => print(`Processing log: ${log}`));
    }
}

const handler = {
    get(target, prop, receiver) {
        if (prop === 'log') {
            return new Proxy(target[prop], {
                apply(targetFunc, thisArg, argumentsList) {
                    print(`Proxy intercept: Logging message - ${argumentsList[0]}`);
                    return Reflect.apply(targetFunc, thisArg, argumentsList);
                }
            });
        }
        return Reflect.get(target, prop, receiver);
    }
};

const logger = new Proxy(new Logger(), handler);

(async () => {
    logger.log("Hello, world!");
    logger.log("Logging with proxies and symbols!");
    
    print("Logs will be processed after 1 second...");
    await logger.processLogs();
})();
