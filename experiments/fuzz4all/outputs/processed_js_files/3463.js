class AsyncEventEmitter {
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
            const listeners = this.events.get(event);
            listeners.forEach(async (listener) => {
                try {
                    await listener(...args);
                } catch (error) {
                    console.error(`Error in listener for event '${event}':`, error);
                }
            });
        }
    }
}

 
const emitter = new AsyncEventEmitter();

emitter.on('data', async (msg) => {
    await new Promise(res => setTimeout(res, 100));  
    print('Received:', msg);
});

emitter.on('data', async (msg) => {
    if (msg.includes('error')) throw new Error('Test error');
    print('Processed:', msg);
});

emitter.emit('data', 'Hello, world!');
emitter.emit('data', 'Trigger error');
