class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncProcess = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Data from async process"), 1000);
    });
};

const runWithTimeout = async (promise, timeout) => {
    let timer;
    const timeoutPromise = new Promise((_, reject) =>
        timer = setTimeout(() => reject(new Error("Operation timed out")), timeout)
    );

    return Promise.race([promise, timeoutPromise])
        .finally(() => clearTimeout(timer));
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', (data) => {
        print(`Received: ${data}`);
    });

    eventEmitter.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    try {
        const result = await runWithTimeout(asyncProcess(), 2000);
        eventEmitter.emit('data', result);
    } catch (error) {
        eventEmitter.emit('error', error);
    }
})();
