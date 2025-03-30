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

class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.activeCount = 0;
        this.eventEmitter = new EventEmitter();
    }

    enqueue(task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        if (this.queue.length === 0 || this.activeCount >= this.concurrency) return;
        const task = this.queue.shift();
        this.activeCount++;

        const onComplete = async () => {
            await task();
            this.activeCount--;
            this.eventEmitter.emit('completedTask');
            this.next();
        };

        onComplete().catch(err => this.eventEmitter.emit('error', err));
    }

    onComplete(listener) {
        this.eventEmitter.on('completedTask', listener);
    }

    onError(listener) {
        this.eventEmitter.on('error', listener);
    }
}

(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const logTask = id => async () => {
        print(`Task ${id} started`);
        await sleep(Math.random() * 2000);
        print(`Task ${id} completed`);
    };

    const taskQueue = new TaskQueue(2);

    taskQueue.onComplete(() => print('A task has completed.'));
    taskQueue.onError(err => console.error(`Task error: ${err}`));

    [1, 2, 3, 4, 5].forEach(id => taskQueue.enqueue(logTask(id)));
})();
