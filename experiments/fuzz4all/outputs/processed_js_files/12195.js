class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (!this.events.has(event)) return;
        for (let listener of this.events.get(event)) {
            listener(...args);
        }
    }
}

const asyncTask = () => new Promise((resolve) => setTimeout(() => resolve('Task Completed!'), 1000));

(async function main() {
    const emitter = new EventEmitter();

    const handleResult = async () => {
        try {
            const result = await asyncTask();
            print(result);
            emitter.emit('taskCompleted', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    emitter.on('taskCompleted', (message) => {
        print('Event Received:', message);
        print('Enhanced Message:', message.replace('Completed', 'Achieved'));
    });

    await handleResult();
})();
