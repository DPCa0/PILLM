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

const asyncTask = (duration, result) => new Promise(resolve => setTimeout(() => resolve(result), duration));

const parallelExecution = async (tasks) => {
    const results = await Promise.allSettled(tasks.map(task => task()));
    return results.map(result => result.status === 'fulfilled' ? result.value : null);
};

(async () => {
    const eventBus = new EventEmitter();

    const task1 = async () => {
        eventBus.emit('taskStart', 'task1');
        const result = await asyncTask(1000, 'Task 1 completed');
        eventBus.emit('taskEnd', 'task1', result);
        return result;
    };

    const task2 = async () => {
        eventBus.emit('taskStart', 'task2');
        const result = await asyncTask(2000, 'Task 2 completed');
        eventBus.emit('taskEnd', 'task2', result);
        return result;
    };

    eventBus.on('taskStart', (taskName) => {
        print(`Started: ${taskName}`);
    });

    eventBus.on('taskEnd', (taskName, result) => {
        print(`Finished: ${taskName} with result: ${result}`);
    });

    const results = await parallelExecution([task1, task2]);
    print('All tasks completed with results:', results);
})();
