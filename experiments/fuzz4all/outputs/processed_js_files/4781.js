class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

class AsyncLogger extends EventEmitter {
    log(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.emit('log', message);
                resolve(message);
            }, 1000);
        });
    }
}

const asyncLogger = new AsyncLogger();

asyncLogger.on('log', async (msg) => {
    print(`Logged: ${msg}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    print(`Processed: ${msg}`);
});

async function* messageGenerator() {
    const messages = ['Hello', 'World', 'This', 'Is', 'Advanced', 'JavaScript'];
    for (const msg of messages) {
        yield msg;
    }
}

(async () => {
    for await (const msg of messageGenerator()) {
        await asyncLogger.log(msg);
    }
})();
