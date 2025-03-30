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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(listener => listener !== listenerToRemove));
        }
    }
}

class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    async runTask(task) {
        this.queue.push(task);
        if (!this.processing) {
            this.processing = true;
            while (this.queue.length > 0) {
                const currentTask = this.queue.shift();
                await currentTask();
            }
            this.processing = false;
        }
    }
}

const delayedPromise = (msg, delay) => new Promise(resolve => setTimeout(() => {
    print(msg);
    resolve();
}, delay));

const emitter = new EventEmitter();
const queue = new AsyncQueue();

emitter.on('task', task => queue.runTask(() => delayedPromise(task.msg, task.delay)));

emitter.emit('task', { msg: 'First task', delay: 1000 });
emitter.emit('task', { msg: 'Second task', delay: 500 });
emitter.emit('task', { msg: 'Third task', delay: 1500 });
