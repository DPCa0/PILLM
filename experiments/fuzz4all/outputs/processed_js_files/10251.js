class AsyncLogger {
    #logs = [];

    constructor() {
        this.#initialize();
    }

    async #initialize() {
        await this.#simulateDelay(100);
        this.#logs.push("Logger initialized.");
    }

    async #simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    log(message) {
        this.#logs.push({ message, timestamp: new Date() });
    }

    async dumpLogs() {
        await this.#simulateDelay(50);
        console.table(this.#logs);
    }
}

class EventEmitter {
    #events = {};

    on(event, listener) {
        (this.#events[event] || (this.#events[event] = [])).push(listener);
        return () => this.off(event, listener);
    }

    off(event, listener) {
        if (this.#events[event]) {
            this.#events[event] = this.#events[event].filter(l => l !== listener);
        }
    }

    emit(event, ...args) {
        (this.#events[event] || []).slice().forEach(listener => listener(...args));
    }
}

(async () => {
    const logger = new AsyncLogger();
    const emitter = new EventEmitter();

    emitter.on('greet', name => logger.log(`Hello, ${name}!`));
    emitter.emit('greet', 'Alice');
    emitter.emit('greet', 'Bob');

    await logger.dumpLogs();
})();
