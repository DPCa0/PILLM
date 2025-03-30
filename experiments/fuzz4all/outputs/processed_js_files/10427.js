class Emitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }
}

const asyncTask = async (data, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Processed ${data}`), delay);
    });
};

(async () => {
    const emitter = new Emitter();

    emitter.on('taskCompleted', async (result) => {
        print('Task Completed:', result);
        const processedResult = await asyncTask(result, 500);
        print('Further Processed:', processedResult);
    });

    const data = ['task1', 'task2', 'task3'];

    for (const item of data) {
        emitter.emit('taskCompleted', await asyncTask(item, 1000));
    }
})();
