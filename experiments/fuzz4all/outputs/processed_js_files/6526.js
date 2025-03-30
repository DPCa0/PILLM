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

const asyncTask = async (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Task ${num} completed`);
        }, Math.random() * 1000);
    });
};

(async function main() {
    const eventEmitter = new EventEmitter();
    const results = [];
    
    eventEmitter.on('taskCompleted', result => {
        print(result);
        results.push(result);
        if (results.length === 3) {
            print('All tasks completed:', results);
        }
    });

    const tasks = [1, 2, 3].map(num => {
        return asyncTask(num).then(result => {
            eventEmitter.emit('taskCompleted', result);
        });
    });

    await Promise.all(tasks);
})();
