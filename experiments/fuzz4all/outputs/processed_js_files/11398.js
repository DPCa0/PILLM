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
            this.events.get(event).forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function() {
    const emitter = new EventEmitter();

    function logMessage(message) {
        print(`Received: ${message}`);
    }

    emitter.on('message', logMessage);

    const messages = ["Hello", "Advanced", "JavaScript", "World"];
    
    for (const message of messages) {
        await delay(1000);
        emitter.emit('message', message);
    }

    emitter.off('message', logMessage);

    print("All messages received and processed.");
})();
