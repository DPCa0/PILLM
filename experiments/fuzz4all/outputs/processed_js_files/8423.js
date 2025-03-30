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
            for (let listener of this.events.get(event)) {
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

const asyncTask = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processTasks = async function* (tasks) {
    for (let task of tasks) {
        yield await asyncTask(task);
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('taskComplete', (index) => {
        print(`Task ${index} complete.`);
    });

    const tasks = [1000, 2000, 3000];
    const taskRunner = processTasks(tasks);

    for await (let task of taskRunner) {
        emitter.emit('taskComplete', tasks.indexOf(task) + 1);
    }

    print('All tasks complete.');
})();
