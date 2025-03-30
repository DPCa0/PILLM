class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = (message) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(message);
            resolve(`Resolved: ${message}`);
        }, Math.random() * 1000);
    });
};

(async function main() {
    const emitter = new EventEmitter();

    emitter.on('start', async () => {
        const messages = ["Hello", "world!", "This", "is", "JavaScript."];
        
        const results = await Promise.all(messages.map(async (msg) => {
            const result = await asyncOperation(msg);
            emitter.emit('processed', result);
        }));
        
        print('All tasks completed:', results);
    });

    emitter.on('processed', (result) => {
        print('Processed:', result);
    });

    emitter.emit('start');
})();
