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

const asyncIterable = {
    [Symbol.asyncIterator]: function* () {
        const data = ['Hello', 'from', 'an', 'async', 'iterator'];
        for (const word of data) {
            yield new Promise(resolve => setTimeout(() => resolve(word), 1000));
        }
    }
};

const printAsyncWords = async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('word', word => print(`Event received: ${word}`));
    
    for await (const word of asyncIterable) {
        eventEmitter.emit('word', word);
    }

    const data = [1, 2, 3, 4, 5];
    const doubleValues = data.map(n => n * 2);
    print(`Doubled Values: ${doubleValues.join(', ')}`);
};

printAsyncWords();
