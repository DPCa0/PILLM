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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const asyncProcess = async (id, delay) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Process ${id} completed.`), delay);
    });
};

const main = async () => {
    const eventEmitter = new EventEmitter();
    
    eventEmitter.on('processCompleted', msg => {
        print(msg);
    });

    const tasks = [1, 2, 3, 4, 5].map(async (id) => {
        const msg = await asyncProcess(id, Math.random() * 2000 + 500);
        eventEmitter.emit('processCompleted', msg);
    });

    await Promise.all(tasks);
    print('All processes are done.');
};

main();
