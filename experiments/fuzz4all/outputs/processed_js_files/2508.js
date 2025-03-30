class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }
    emit(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}

const asyncOperation = (x) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (x > 0) resolve(x * 2);
        else reject('Value must be greater than zero');
    }, 1000);
});

(async () => {
    try {
        const values = [1, 2, 3, 4];
        const eventEmitter = new EventEmitter();

        eventEmitter.on('result', (result) => {
            print('Result received:', result);
        });

        const results = await Promise.all(
            values.map(async (value) => {
                try {
                    const result = await asyncOperation(value);
                    eventEmitter.emit('result', result);
                    return result;
                } catch (error) {
                    console.error('Error:', error);
                }
            })
        );

        print('Final Results:', results.filter(r => r !== undefined));
    } catch (error) {
        console.error('Global Error:', error);
    }
})();
