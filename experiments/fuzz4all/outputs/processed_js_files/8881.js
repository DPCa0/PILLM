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

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const asyncOperation = () =>
    new Promise((resolve) => setTimeout(() => resolve("Data Loaded"), 1000));

(async () => {
    const emitter = new EventEmitter();

    emitter.on("data", (data) => {
        print(`Data received: ${data}`);
    });

    emitter.on("data", (data) => {
        print(`Logging again: ${data}`);
    });

    emitter.on("error", (error) => {
        console.error(`Error: ${error}`);
    });

    try {
        const data = await asyncOperation();
        emitter.emit("data", data);
    } catch (error) {
        emitter.emit("error", error);
    }

    emitter.off("data", console.log);
    emitter.emit("data", "This won't be logged by console.log");   
})();
