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

class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async enqueue(task) {
        this.queue.push(task);
        if (!this.processing) {
            await this.process();
        }
    }

    async process() {
        this.processing = true;
        while (this.queue.length > 0) {
            const task = this.queue.shift();
            await task();
        }
        this.processing = false;
    }
}

const emitter = new EventEmitter();
const asyncQueue = new AsyncQueue();

emitter.on('taskAdded', async (taskName, taskFunc) => {
    print(`Task Added: ${taskName}`);
    await asyncQueue.enqueue(taskFunc);
});

emitter.on('taskCompleted', (taskName) => {
    print(`Task Completed: ${taskName}`);
});

 
const tasks = [
    ['Task 1', async () => { await new Promise(res => setTimeout(res, 1000)); emitter.emit('taskCompleted', 'Task 1'); }],
    ['Task 2', async () => { await new Promise(res => setTimeout(res, 500)); emitter.emit('taskCompleted', 'Task 2'); }],
    ['Task 3', async () => { await new Promise(res => setTimeout(res, 2000)); emitter.emit('taskCompleted', 'Task 3'); }]
];

tasks.forEach(([name, func]) => emitter.emit('taskAdded', name, func));
