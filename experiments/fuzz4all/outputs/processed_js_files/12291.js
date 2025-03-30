class EventEmitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            for (const listener of this.#events.get(event)) {
                listener(...args);
            }
        }
    }

    off(event, listenerToRemove) {
        if (this.#events.has(event)) {
            const listeners = this.#events.get(event).filter(listener => listener !== listenerToRemove);
            this.#events.set(event, listeners);
        }
    }
}

class TaskQueue {
    #tasks = [];

    addTask(delay) {
        return new Promise(resolve => {
            setTimeout(() => {
                print(`Task completed after ${delay}ms`);
                resolve(`Task with ${delay}ms delay`);
            }, delay);
        });
    }

    async runTasks() {
        for (const task of this.#tasks) {
            await task();
        }
    }

    createTask(delay) {
        this.#tasks.push(() => this.addTask(delay));
    }
}

(async function main() {
    const eventEmitter = new EventEmitter();
    const taskQueue = new TaskQueue();

    eventEmitter.on('taskCompleted', message => print('Event received:', message));

     
    [1000, 500, 2000].forEach(delay => {
        taskQueue.createTask(delay);
        eventEmitter.emit('taskCompleted', `Task with ${delay}ms delay added`);
    });

     
    await taskQueue.runTasks();
})();
