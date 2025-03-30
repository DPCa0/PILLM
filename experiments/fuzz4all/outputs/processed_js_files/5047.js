class EventEmitter {
    #listeners = new Map();

    on(event, listener) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.#listeners.has(event)) {
            for (const listener of this.#listeners.get(event)) {
                listener(...args);
            }
        }
    }
}

const delayedLog = new Proxy(console.log, {
    apply: function(target, thisArg, args) {
        setTimeout(() => Reflect.apply(target, thisArg, args), 1000);
    }
});

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.complete = false;
    }

    async start() {
        delayedLog(`Starting task: ${this.name}`);
        await new Promise(resolve => setTimeout(resolve, this.duration));
        this.complete = true;
        delayedLog(`Completed task: ${this.name}`);
    }
}

(async function main() {
    const taskEmitter = new EventEmitter();

    const task1 = new Task("Task 1", 2000);
    const task2 = new Task("Task 2", 1000);

    taskEmitter.on('start', (task) => delayedLog(`Event: ${task.name} has started`));
    taskEmitter.on('complete', (task) => delayedLog(`Event: ${task.name} has completed`));

    taskEmitter.emit('start', task1);
    await task1.start();
    taskEmitter.emit('complete', task1);

    taskEmitter.emit('start', task2);
    await task2.start();
    taskEmitter.emit('complete', task2);
})();
