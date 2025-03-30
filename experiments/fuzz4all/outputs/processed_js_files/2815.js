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

const asyncTask = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('taskCompleted', (taskName, duration) => {
        print(`Task ${taskName} completed in ${duration}ms`);
    });

    const runTasks = async () => {
        const tasks = [
            { name: 'Task1', duration: 1000 },
            { name: 'Task2', duration: 2000 },
            { name: 'Task3', duration: 500 }
        ];

        const taskPromises = tasks.map(({ name, duration }) =>
            asyncTask(duration).then(() => {
                eventEmitter.emit('taskCompleted', name, duration);
            })
        );

        await Promise.all(taskPromises);
    };

    await runTasks();
})();
