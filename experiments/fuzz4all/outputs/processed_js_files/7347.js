class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(listener);
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            this.#events.get(event).delete(listener);
            if (this.#events.get(event).size === 0) {
                this.#events.delete(event);
            }
        }
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOp = () => new Promise((resolve) => setTimeout(() => resolve('Done!'), 1000));

const main = async () => {
    const emitter = new EventEmitter();

    const listener = async (message) => {
        print(`Listener received: ${message}`);
        const result = await asyncOp();
        print(`Async Operation Result: ${result}`);
    };

    emitter.on('event1', listener);
    
    print('Emitting event1...');
    emitter.emit('event1', 'Hello, EventEmitter!');

     
    const timer = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout!')), 500));
    
    try {
        await Promise.race([asyncOp(), timer]);
    } catch (error) {
        console.error(error.message);
    } finally {
        emitter.off('event1', listener);
        print('Listener removed and operation complete.');
    }
};

main();
