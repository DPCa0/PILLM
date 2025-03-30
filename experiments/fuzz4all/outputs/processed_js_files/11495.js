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
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const complexComputation = async (input) => {
    await delay(1000);   
    return input.split('').reverse().join('');
};

const processInput = async (input, emitter) => {
    const result = await complexComputation(input);
    emitter.emit('processed', result);
};

 
const emitter = new EventEmitter();

emitter.on('processed', (result) => {
    print('Processed result:', result);
});

(async () => {
    const input = "Hello, world!";
    print('Original input:', input);
    await processInput(input, emitter);
})();
