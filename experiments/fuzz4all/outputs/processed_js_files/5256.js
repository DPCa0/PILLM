class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                await listener(...args);
            }
        }
    }
}

const asyncEmitter = new AsyncEventEmitter();

 
function createLoggingProxy(obj) {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Property '${prop}' accessed.`);
            return target[prop];
        },
        set(target, prop, value) {
            print(`Property '${prop}' set to ${value}.`);
            target[prop] = value;
            return true;
        }
    });
}

const config = createLoggingProxy({ logLevel: 'info', retryAttempts: 3 });

asyncEmitter.on('data', async (data) => {
    print(`Received data: ${data}`);
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Processed data: ${data}`);
});

asyncEmitter.on('error', async (error) => {
    console.error(`Error encountered: ${error.message}`);
    if (config.retryAttempts > 0) {
        print(`Retrying... ${config.retryAttempts} attempts left.`);
        config.retryAttempts--;
        await asyncEmitter.emit('data', 'RetryData');
    }
});

(async () => {
    await asyncEmitter.emit('data', 'InitialData');
    await asyncEmitter.emit('error', new Error('Network Failure'));
})();
