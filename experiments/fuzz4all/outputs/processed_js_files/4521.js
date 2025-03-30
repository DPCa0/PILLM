class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        (this.events[event] || (this.events[event] = [])).push(listener);
        return this;
    }

    emit(event, ...args) {
        (this.events[event] || []).slice().forEach(fn => fn(...args));
        return this;
    }
}

const asyncOperation = (message, delay) => new Promise((resolve) => {
    setTimeout(() => resolve(message), delay);
});

const main = async () => {
    const emitter = new EventEmitter();

    const delayedMessages = [
        asyncOperation('First Message!', 2000),
        asyncOperation('Second Message!', 1000),
        asyncOperation('Third Message!', 3000)
    ];

    const handleResponse = response => print(`Received: ${response}`);
    
    emitter.on('response', handleResponse);

    for await (const message of delayedMessages) {
        const result = await message;
        emitter.emit('response', result);
    }
};

main();
