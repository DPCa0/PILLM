class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }
    emit(event, ...args) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = (taskName, duration) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve(`Task ${taskName} completed`);
            } else {
                reject(`Task ${taskName} failed`);
            }
        }, duration);
    });

async function performTasks() {
    const tasks = ['A', 'B', 'C'].map(task => asyncOperation(task, 1000));

    try {
        const results = await Promise.allSettled(tasks);
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                print(result.value);
            } else {
                console.error(result.reason);
            }
        });
    } catch (error) {
        console.error(`Error performing tasks: ${error}`);
    }
}

const emitter = new EventEmitter();

emitter.on('start', () => print('Starting tasks...'));
emitter.on('complete', result => print('All tasks completed:', result));

emitter.emit('start');
performTasks().then(() => emitter.emit('complete'));
