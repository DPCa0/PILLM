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
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncOperation = async (data) => {
    await delay(1000);
    return `Processed ${data}`;
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', async (data) => {
        try {
            const result = await asyncOperation(data);
            print(result);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    });

    eventEmitter.emit('data', 'Sample Data 1');
    eventEmitter.emit('data', 'Sample Data 2');
})();
