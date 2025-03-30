class AsyncEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            for (let listener of listeners) {
                await listener(...args);
            }
        }
    }
}

const asyncOperation = (name) => {
    return new Promise(resolve => {
        setTimeout(() => {
            print(`Completed ${name}`);
            resolve();
        }, Math.random() * 1000);
    });
};

(async () => {
    const emitter = new AsyncEventEmitter();

    emitter.on('start', async (taskName) => {
        print(`Starting task: ${taskName}`);
        await asyncOperation(taskName);
        print(`Task ${taskName} done`);
    });

    const taskNames = ['Task1', 'Task2', 'Task3'];
    for (let name of taskNames) {
        emitter.emit('start', name);
    }
})();
