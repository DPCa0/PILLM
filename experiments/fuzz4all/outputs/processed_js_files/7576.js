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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

const asyncTask = (msg, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(msg);
            resolve(msg);
        }, delay);
    });
};

(async function advancedExample() {
    const emitter = new EventEmitter();

    emitter.on('taskCompleted', (message) => {
        print(`Listener received: ${message}`);
    });

    const tasks = ['Task 1', 'Task 2', 'Task 3'].map((task, index) =>
        asyncTask(task, (index + 1) * 1000).then((msg) => {
            emitter.emit('taskCompleted', `${msg} is done`);
        })
    );

    await Promise.all(tasks);
    print('All tasks completed');
})();
