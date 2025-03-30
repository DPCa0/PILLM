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

const asyncTask = async (name, duration) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(`Task ${name} completed in ${duration}ms`);
            resolve(name);
        }, duration);
    });
};

(async function() {
    const eventEmitter = new EventEmitter();
    
    const taskCompletedListener = (taskName) => {
        print(`Listener: ${taskName} is completed`);
    };

    eventEmitter.on('taskCompleted', taskCompletedListener);

    const tasks = [
        asyncTask('A', 1000),
        asyncTask('B', 500),
        asyncTask('C', 1500)
    ];

    const results = await Promise.all(tasks.map(async (taskPromise) => {
        const taskName = await taskPromise;
        eventEmitter.emit('taskCompleted', taskName);
        return taskName;
    }));

    print('All tasks completed:', results);

    eventEmitter.off('taskCompleted', taskCompletedListener);
})();
