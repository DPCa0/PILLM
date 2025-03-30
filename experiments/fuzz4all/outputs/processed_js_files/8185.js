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
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }

    once(event, listener) {
        const onceListener = (...args) => {
            listener(...args);
            this.off(event, onceListener);
        };
        this.on(event, onceListener);
    }

    off(event, listener) {
        const listeners = this.events.get(event);
        if (listeners) {
            this.events.set(event, listeners.filter(l => l !== listener));
        }
    }
}

 
class TaskScheduler extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
        this.running = false;
    }

    async runNext() {
        if (this.running || this.queue.length === 0) return;
        this.running = true;
        const task = this.queue.shift();
        try {
            await task();
            this.emit('success', task);
        } catch (error) {
            this.emit('error', error);
        } finally {
            this.running = false;
            this.runNext();
        }
    }

    addTask(task) {
        this.queue.push(task);
        this.runNext();
    }
}

 
const scheduler = new TaskScheduler();

scheduler.on('success', () => print('Task completed successfully.'));
scheduler.once('error', error => console.error(`Task failed: ${error}`));

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

scheduler.addTask(async () => {
    print('Running task 1');
    await delay(1000);
});

scheduler.addTask(async () => {
    print('Running task 2');
    await delay(500);
    throw new Error('Task 2 failed!');
});

scheduler.addTask(async () => {
    print('Running task 3');
    await delay(2000);
});
