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

const asyncOperation = async (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            print(`Processed: ${data}`);
            resolve(`Result: ${data}`);
        }, 1000);
    });
};

const runAsyncOperations = async () => {
    const results = await Promise.all([
        asyncOperation("Task 1"),
        asyncOperation("Task 2"),
        asyncOperation("Task 3")
    ]);
    print(results);
};

class Worker {
    constructor(name) {
        this.name = name;
    }

    async work() {
        print(`${this.name} started working.`);
        await runAsyncOperations();
        print(`${this.name} finished working.`);
    }
}

const eventEmitter = new EventEmitter();
eventEmitter.on('start', async () => {
    const worker = new Worker('Worker1');
    await worker.work();
});
eventEmitter.emit('start');
