class EventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.listeners.has(event)) {
            for (const listener of this.listeners.get(event)) {
                listener(...args);
            }
        }
    }

    off(event, listenerToRemove) {
        if (!this.listeners.has(event)) return;
        const listeners = this.listeners.get(event);
        this.listeners.set(
            event,
            listeners.filter(listener => listener !== listenerToRemove)
        );
    }
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const emitter = new EventEmitter();

function helloListener(message) {
    print(`Hello, ${message}!`);
}

const debouncedHello = debounce(helloListener, 300);

emitter.on('greet', debouncedHello);

['World', 'JavaScript', 'EventEmitter'].forEach(name => {
    emitter.emit('greet', name);
});
