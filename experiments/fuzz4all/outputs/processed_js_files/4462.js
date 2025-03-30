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
}

 
const logger = new Proxy(console, {
    get(target, prop) {
        if (['log', 'info', 'warn', 'error'].includes(prop)) {
            return function(...args) {
                target[prop](`[${prop.toUpperCase()}]`, ...args);
            }
        }
        return target[prop];
    }
});

 
class RandomNumberGenerator {
    constructor(max) {
        this.max = max;
    }

    async *[Symbol.asyncIterator]() {
        while (true) {
            await new Promise(r => setTimeout(r, 1000));
            yield Math.floor(Math.random() * this.max);
        }
    }
}

const events = new EventEmitter();

events.on('data', data => {
    logger.info('Received data:', data);
});

events.on('error', err => {
    logger.error('Error encountered:', err);
});

(async () => {
    try {
        for await (const num of new RandomNumberGenerator(100)) {
            if (num > 90) throw new Error('Number too high!');
            events.emit('data', num);
        }
    } catch (err) {
        events.emit('error', err);
    }
})();
