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

    off(event, listenerToRemove) {
        if (this.events.has(event)) {
            const filteredListeners = this.events.get(event).filter(listener => listener !== listenerToRemove);
            this.events.set(event, filteredListeners);
        }
    }
}

class AsyncOperation {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }

    async performOperation() {
        print('Operation started.');
        
        await new Promise(resolve => setTimeout(resolve, 1000));  
        const result = Math.random() > 0.5 ? 'success' : 'failure';
        
        if (result === 'success') {
            this.eventEmitter.emit('operationSuccess', 'Operation completed successfully.');
        } else {
            this.eventEmitter.emit('operationFailure', 'Operation failed.');
        }

        print('Operation ended.');
    }
}

const eventEmitter = new EventEmitter();

eventEmitter.on('operationSuccess', message => {
    print('Success Event:', message);
});

eventEmitter.on('operationFailure', message => {
    print('Failure Event:', message);
});

const asyncOperation = new AsyncOperation(eventEmitter);
asyncOperation.performOperation();
