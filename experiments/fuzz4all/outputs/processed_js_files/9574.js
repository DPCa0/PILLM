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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event).filter(l => l !== listener));
        }
    }
}

function asyncProcess(number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (number > 0) {
                resolve(number * 2);
            } else {
                reject(new Error('Invalid number'));
            }
        }, 1000);
    });
}

(async () => {
    const emitter = new EventEmitter();

    emitter.on('success', (result) => {
        print(`Process succeeded with result: ${result}`);
    });

    emitter.on('error', (error) => {
        print(`Process failed with error: ${error.message}`);
    });

    try {
        const result = await asyncProcess(5);
        emitter.emit('success', result);
    } catch (error) {
        emitter.emit('error', error);
    }

    try {
        const result = await asyncProcess(-1);
        emitter.emit('success', result);
    } catch (error) {
        emitter.emit('error', error);
    }
})();
