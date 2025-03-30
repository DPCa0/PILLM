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

    off(event, listener) {
        if (this.events.has(event)) {
            this.events.get(event).delete(listener);
            if (this.events.get(event).size === 0) {
                this.events.delete(event);
            }
        }
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

class ProxyHandler {
    constructor(target, handler) {
        return new Proxy(target, handler);
    }
}

const advancedArray = new ProxyHandler([], {
    get(target, prop) {
        if (prop === 'last') {
            return target[target.length - 1];
        }
        return target[prop];
    },
    set(target, prop, value) {
        if (typeof value !== 'number') {
            throw new Error('Only numbers are allowed');
        }
        target[prop] = value;
        return true;
    }
});

const emitter = new EventEmitter();

emitter.on('data', data => print('Received data:', data));
emitter.on('error', error => console.error('Error:', error));

try {
    advancedArray.push(1, 2, 3);
    print('Last element:', advancedArray.last);
    advancedArray.push('Hello');  
} catch (e) {
    emitter.emit('error', e.message);
}

emitter.emit('data', 'Processing Complete');
