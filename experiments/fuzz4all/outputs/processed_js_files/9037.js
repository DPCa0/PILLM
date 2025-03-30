class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncTask = async (x) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(x * 2), 1000);
    });
};

const performTasks = async (inputArray) => {
    try {
        const results = await Promise.all(inputArray.map(asyncTask));
        const [first, ...rest] = results;
        return rest.reduce((acc, curr) => acc + curr, first);
    } catch (error) {
        throw new Error('Task failure');
    }
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('completed', result => {
        print('All tasks completed. Final result:', result);
    });

    try {
        const taskInput = [1, 2, 3, 4, 5];
        const finalResult = await performTasks(taskInput);
        emitter.emit('completed', finalResult);
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
