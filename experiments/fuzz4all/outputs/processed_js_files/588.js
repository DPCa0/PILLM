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
        const listeners = this.events.get(event) || [];
        listeners.forEach(listener => listener.apply(this, args));
    }
}

const asyncOperation = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.5 ? resolve('Success') : reject('Failure');
        }, 1000);
    });
};

(async () => {
    const emitter = new EventEmitter();

    emitter.on('success', message => {
        print(`Operation was a ${message}`);
    });

    emitter.on('failure', message => {
        print(`Operation encountered a ${message}`);
    });

    try {
        const result = await asyncOperation();
        emitter.emit('success', result);
    } catch (error) {
        emitter.emit('failure', error);
    }
})();
