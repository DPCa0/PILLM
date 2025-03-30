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
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
    
    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
            if (this.events.get(event).size === 0) {
                this.events.delete(event);
            }
        }
    }
}

const asyncOperation = async (val) => {
    return new Promise(resolve => setTimeout(() => resolve(val * 2), 1000));
};

const complexOperation = async (arr) => {
    return await Promise.all(arr.map(async num => await asyncOperation(num)));
};

const eventEmitter = new EventEmitter();
eventEmitter.on('dataProcessed', (data) => {
    print('Processed Data:', data);
});

(async () => {
    const numbers = [1, 2, 3, 4, 5];
    const processedData = await complexOperation(numbers);
    eventEmitter.emit('dataProcessed', processedData);
})();
