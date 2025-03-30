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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function* asyncCounter(start, end, delayTime) {
    for (let i = start; i <= end; i++) {
        await delay(delayTime);
        yield i;
    }
}

(async () => {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('count', count => {
        print(`Count is: ${count}`);
    });

    eventEmitter.on('done', () => {
        print('Counter finished.');
    });

    const counter = asyncCounter(1, 5, 1000);
    for await (const num of counter) {
        eventEmitter.emit('count', num);
    }
    eventEmitter.emit('done');
})();
