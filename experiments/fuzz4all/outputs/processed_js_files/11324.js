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
            this.events.get(event).forEach(listener => listener.apply(this, args));
        }
    }
}

const asyncOperation = (success = true) => 
    new Promise((resolve, reject) => 
        setTimeout(() => success ? resolve("Success") : reject("Failure"), 1000)
    );

(async function execute() {
    const events = new EventEmitter();

    events.on('start', () => print('Operation started.'));
    events.on('end', () => print('Operation ended.'));
    events.on('success', message => print('Result:', message));
    events.on('failure', message => console.error('Error:', message));

    events.emit('start');

    try {
        const result = await asyncOperation();
        events.emit('success', result);
    } catch (error) {
        events.emit('failure', error);
    } finally {
        events.emit('end');
    }
})();
